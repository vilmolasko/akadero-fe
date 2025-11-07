import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, BarChart3 } from "lucide-react";
import { useCurrencyFormat } from "@/hooks/formatCurrency";
export default function DashboardStats({ summary }) {
  const fCurrency = useCurrencyFormat();
  const stats = [
    {
      title: "Pajamos",
      value: summary?.revenue ? fCurrency(summary?.revenue) : fCurrency(0),
      icon: DollarSign,
    },
    {
      title: "Iš viso studentų",
      value: summary?.totalStudents,
      icon: Users,
    },
    {
      title: "Iš viso kursų",
      value: summary?.totalCourses,
      icon: ShoppingBag,
    },

    {
      title: "Organizatoriai",
      value: summary?.totalOrganizers,
      icon: BarChart3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map(({ title, value, icon: Icon }) => (
        <Card key={title} className={"p-3"}>
          <CardHeader className="flex flex-row items-center justify-between px-0  space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">
              {title}
            </CardTitle>
            <Icon size={20} className="text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
