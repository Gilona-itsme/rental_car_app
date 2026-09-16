"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBookingCar } from "@/lib/api";
import { useBookingDraftStore, initialDraft } from "@/lib/store/bookingStore";
import { bookingSchema, type BookingFormData} from "@/lib/validation_schema";
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
		reset,
		formState: { errors },
	} = useForm<BookingFormData>({
		resolver: zodResolver(bookingSchema),
		defaultValues: initialDraft,
		mode: "onChange",
	});

	useEffect(() => {
		const applyHydration = () => {
			setIsHydrated(true);
			reset(useBookingDraftStore.getState().draft); 
		};

		if (useBookingDraftStore.persist.hasHydrated()) {
			applyHydration();
		}
		const unsubscribe = useBookingDraftStore.persist.onFinishHydration(applyHydration);
		return unsubscribe;
	}, [reset]);

	const bookingMutation = useMutation({
		mutationFn: (data: BookingFormData) => createBookingCar(data, carId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["car", carId] });
			clearDraft();
			toast.success("Booking request sent successfully!", {position: "top-left", style: {
				border: '1px solid #0095ba', padding: "16px", color: "#101828"
			}});
			onSuccess?.();
		},
		onError: () => {
			toast.error("Failed to send your request. Please try again.", {position: "top-left", style: {
				border: '1px solid #0095ba', padding: "16px", color: "#101828"
			}});
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