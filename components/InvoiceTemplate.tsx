"use client";
import { Printer } from "lucide-react";

interface InvoiceField {
    label: string;
    value: string | number | Date;
    type: 'text' | 'number' | 'currency' | 'date' | 'image';
}

interface InvoiceTemplateProps {
    data: {
        fields: InvoiceField[];
    };
}

const InvoiceTemplate = ({ data }: InvoiceTemplateProps) => {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('ar-EG');
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: 'EGP',
        }).format(value);
    };

    const FieldRenderer = ({ field }: { field: InvoiceField }) => {
        switch (field.type) {
            case 'image':
                return (
                    <img
                        src={field.value as string}
                        alt="Logo"
                        className="w-32 h-32 object-contain"
                    />
                );
            case 'date':
                return (
                    <p className="text-lg font-semibold text-gray-700">
                        {formatDate(field.value as Date)}
                    </p>
                );
            case 'currency':
                return (
                    <p className="text-2xl font-bold text-blue-600">
                        {formatCurrency(Number(field.value))}
                    </p>
                );
            default:
                return (
                    <p className="text-lg font-medium text-gray-800">
                        {typeof field.value === 'object' && field.value instanceof Date
                            ? field.value.toLocaleString()
                            : String(field.value)}
                    </p>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div className="flex-1">
                        {data.fields
                            .filter(f => f.label === 'الشعار')
                            .map((field, idx) => (
                                <FieldRenderer key={idx} field={field} />
                            ))}
                    </div>

                    <div className="text-right">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">فاتورة</h1>
                        <div className="space-y-2">
                            {data.fields
                                .filter(f => ['أمر قبض رقم', 'التاريخ'].includes(f.label))
                                .map((field, idx) => (
                                    <div key={idx} className="mb-3">
                                        <label className="block text-sm text-gray-500 mb-1">
                                            {field.label}
                                        </label>
                                        <FieldRenderer field={field} />
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    {data.fields
                        .filter(f => ['السيغ', 'اسم المستلم'].includes(f.label))
                        .map((field, idx) => (
                            <div key={idx} className="mb-4">
                                <label className="block text-sm text-gray-500 mb-2">
                                    {field.label}
                                </label>
                                <FieldRenderer field={field} />
                            </div>
                        ))}
                </div>

                {/* Print Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg
                      hover:bg-blue-700 transition-colors flex items-center gap-2"
                        onClick={() => window.print()}
                    >
                        <Printer className="w-5 h-5" />
                        طباعة الفاتورة
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceTemplate;