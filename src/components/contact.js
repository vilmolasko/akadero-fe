"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useMutation } from "@tanstack/react-query";
import * as api from "@/services";

export default function ContactUs() {
  const [showNumber, setShowNumber] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const { mutate, isPending } = useMutation({
    mutationFn: api.createConatctUs,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        formik.resetForm();
      }, 2000);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Įvyko klaida!");
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vardas yra privalomas"),
      email: Yup.string()
        .email("Neteisingas el. pašto adresas")
        .required("El. paštas yra privalomas"),
      phone: Yup.string()
        .required("Telefono numeris yra privalomas")
        .test(
          "is-valid-phone",
          "Neteisingas telefono numeris",
          (value) => value && isValidPhoneNumber(value)
        ),
      message: Yup.string().required("Laukas Turinio yra privalomas"),
    }),

    onSubmit: async (values, { resetForm }) => {
      if (!captchaValue) {
        toast.error("Prašome patvirtinti, kad nesate robotas");
        return;
      }
      mutate({
        ...values,
      });
    },
  });

  return (
    <main className=" max-w-6xl mx-auto py-12 px-4 ">
      <h1 className="text-lg md:text-4xl font-bold text-foreground text-center mb-8">
        Pagalba mokymų organizatoriams
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left Card - Contact Info */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-3 text-foreground">
              <p>
                <span className="font-semibold">Įmonė:</span> UAB Baltic
                Learning Group
              </p>
              <p>
                <span className="font-semibold">Įmonės kodas:</span> 307055707
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-foreground" />
                <span>
                  <span className="font-semibold">El. paštas:</span>{" "}
                  <a
                    href="mailto:info@akadero.com"
                    className="text-blue-600 hover:underline"
                  >
                    info@akadero.lt
                  </a>
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-foreground" />
                <span className="font-semibold">Telefonas:</span>{" "}
                {showNumber ? (
                  <span className="text-foreground font-medium">
                    +370 687 79075
                  </span>
                ) : (
                  <Button
                    variant="link"
                    className="p-0 text-green-600 font-medium"
                    onClick={() => setShowNumber(true)}
                  >
                    Rodyti numerį
                  </Button>
                )}
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-foreground mt-1" />
                <span>
                  <span className="font-semibold">Adresas:</span> Ozo g. 27,
                  Vilnius, LT-08200
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-foreground" />
                <span>
                  <span className="font-semibold">Darbo laikas:</span> I-IV 9:00
                  - 16:00, V 10:00 - 16:00
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right Card - Contact Form */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">Parašykite mums</h2>
            <p className="text-normal text-muted-foreground mb-2">
              Laukiame žinutės, jeigu turite klausimų, reikalinga papildoma
              informacija ar pagalba.
            </p>

            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Vardas</Label>
                <Input
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-sm text-red-500">{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="email">El. paštas</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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

              {/* Phone */}
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="phone">Telefonas</Label>
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
                  className={`w-full border px-3 py-1.5 rounded-md ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-sm text-red-500">{formik.errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1 md:col-span-2">
                <Label htmlFor="message">Turinys *</Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Įrašykite savo klausimą..."
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-sm text-red-500">
                    {formik.errors.message}
                  </p>
                )}
              </div>

              {/* Google reCAPTCHA */}
              <div className=" md:col-span-2">
                <ReCAPTCHA
                  sitekey={"6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                  onChange={(value) => setCaptchaValue(value)}
                />
              </div>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Siunčiama..." : "Siųsti žinutę"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto mt-6 flex justify-center flex-wrap gap-3">
        <Link href="/" passHref>
          <Button variant="secondary">Grįžti į pradžią</Button>
        </Link>
        <Link href="/privacy-policy" passHref>
          <Button variant="outline">Privatumo politika</Button>
        </Link>
        <Link href="/refund-policy" passHref>
          <Button variant="outline">Naudojimosi sąlygos</Button>
        </Link>
      </div>
    </main>
  );
}
