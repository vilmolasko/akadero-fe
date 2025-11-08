"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"; // assuming shadcn/ui checkbox
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import * as api from "@/services";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Neteisingas el. pašto adresas")
    .required("El. paštas yra privalomas"),
  company: Yup.string().required("Įmonės pavadinimas yra privalomas"),
  phone: Yup.string()
    .required("Telefono numeris yra privalomas")
    .test(
      "is-valid-phone",
      "Neteisingas telefono numeris",
      (value) => value && isValidPhoneNumber(value)
    ),
  description: Yup.string().required("Prašome įrašyti savo klausimą"),
  termsCondition: Yup.boolean().oneOf([true], "Turite sutikti su taisyklėmis"),
});

export default function PlanPopup({ setSelectedPlan, open, setOpen, plan }) {
  const { mutate, isPending } = useMutation({
    mutationFn: api.createPlanRegisteration,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        setOpen(false);
        setSelectedPlan(null);
        formik.resetForm();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Įvyko klaida!");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      company: "",
      phone: "",
      description: "",
      plan: plan?.title + " " + plan?.price,
      termsCondition: false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      mutate({
        ...values,
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Pasirinktas planas: {plan?.title || "–"}</DialogTitle>
          </DialogHeader>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Jūsų el. paštas</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <Label htmlFor="company">Įmonės pavadinimas</Label>
            <Input
              id="company"
              name="company"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.company}
              className={
                formik.touched.company && formik.errors.company
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.company && formik.errors.company && (
              <p className="text-sm text-red-500">{formik.errors.company}</p>
            )}
          </div>

          {/* Phone Input with Country Code */}
          <div className="space-y-1">
            <Label htmlFor="phone">Telefono numeris</Label>
            <PhoneInput
              id="phone"
              name="phone"
              placeholder="+370 600 00000"
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)}
              defaultCountry="LT"
              countries={["LT"]}
              international
              countryCallingCodeEditable={false}
              className={`w-full border px-3 py-1.5 rounded-lg ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500">{formik.errors.phone}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Trumpas aprašymas</Label>
            <Textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Įrašykite savo klausimą..."
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
              className={
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : ""
              }
            />
            {formik.touched.description && formik.errors.description && (
              <p className="text-sm text-red-500">
                {formik.errors.description}
              </p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="termsCondition"
              name="termsCondition"
              checked={formik.values.termsCondition}
              onCheckedChange={(checked) => {
                formik.setFieldValue("termsCondition", checked);
              }}
            />
            <Label htmlFor="termsCondition">
              Sutinku su taisyklėmis ir sąlygomis
            </Label>
          </div>
          {formik.touched.termsCondition && formik.errors.termsCondition && (
            <p className="text-sm text-red-500">
              {formik.errors.termsCondition}
            </p>
          )}

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Atšaukti
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Siunčiama..." : "Registruotis"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
