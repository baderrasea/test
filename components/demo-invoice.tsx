"use client"
import InvoiceTemplate from '../components/InvoiceTemplate';

type InvoiceField = {
  label: string;
  value: string | number | Date;
  type: 'text' | 'currency' | 'image' | 'date';
};

const DemoInvoicePage = () => {
  const demoData = {
    fields: [
      {
        label: 'أمر قبض رقم',
        value: 'INV-2023-001',
        type: 'text',
      },
      {
        label: 'السيغ',
        value: 2500,
        type: 'currency',
      },
      {
        label: 'الشعار',
        value: '/logo.png', // Replace with actual image path
        type: 'image',
      },
      {
        label: 'التاريخ',
        value: new Date(),
        type: 'date',
      },
      {
        label: 'اسم المستلم',
        value: 'محمد أحمد',
        type: 'text',
      },
    ] as InvoiceField[],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">فاتورة تجريبية</h1>
      <InvoiceTemplate data={demoData} />
    </div>
  );
};

export default DemoInvoicePage;