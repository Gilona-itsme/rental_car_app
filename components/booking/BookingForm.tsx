"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBookingCar } from "@/lib/api";
import { useBookingDraftStore } from "@/lib/store/bookingStore";
import { bookingSchema, type BookingFormData } from "@/lib/validation_schema";
import FormField from "@/components/ui/FormField";

type BookingFormProps = {
	carId: string;
	onSuccess?: () => void;
};

export default function BookingForm({ carId, onSuccess }: BookingFormProps) {
	const queryClient = useQueryClient();
	const { draft, setDraft, clearDraft } = useBookingDraftStore();
	const [isHydrated, setIsHydrated] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<BookingFormData>({
		resolver: zodResolver(bookingSchema),
		defaultValues: draft,
		mode: "onChange",
	});

	useEffect(() => {
		if (useBookingDraftStore.persist.hasHydrated()) {
			setIsHydrated(true);
		}
		const unsubscribe = useBookingDraftStore.persist.onFinishHydration(() => {
			setIsHydrated(true);
		});
		return unsubscribe;
	}, []);

	const bookingMutation = useMutation({
		mutationFn: (data: BookingFormData) => createBookingCar(data, carId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["car", carId] });
			clearDraft();
			toast.success("Booking request sent successfully!");
			onSuccess?.();
		},
		onError: () => {
			toast.error("Failed to send your request. Please try again.");
		},
	});

	const values = useWatch({ control });

	useEffect(() => {
		setDraft({
			name: values.name ?? "",
			email: values.email ?? "",
			comment: values.comment ?? "",
		});
	}, [values, setDraft]);

	const onSubmitForm = (data: BookingFormData) => {
		setDraft(data);
		bookingMutation.mutate(data);
	};

	if (!isHydrated) return null;

	return (
		<form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmitForm)}>
			<FormField
				id="name"
				label="Name*"
				error={errors.name?.message}
				registration={register("name")}
			/>

			<FormField
				id="email"
				label="Email*"
				error={errors.email?.message}
				registration={register("email")}
			/>

			<FormField
				id="comment"
				label="Comment"
				as="textarea"
				error={errors.comment?.message}
				registration={register("comment")}
			/>

			<button
				type="submit"
				className="btn-primary mt-2"
				disabled={bookingMutation.isPending}
			>
				{bookingMutation.isPending ? "Sending..." : "Send"}
			</button>
		</form>
	);
}