
import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

const TemplateProperties: React.FC = () => {
  const { 
    templateProperties, 
    updateTemplateProperties, 
    selectedElementId, 
    elements, 
    updateElement 
  } = useEditorStore();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);

  return (
    <div className="w-80 bg-white border-r border-secondary-200 p-4 overflow-y-auto font-arabic">
      <div className="space-y-6">
        {/* Template General Properties */}
        <div>
          <h3 className="text-lg-semibold text-secondary-900 mb-4">خصائص القالب</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm-medium text-secondary-700">العنوان</Label>
              <Input
                id="title"
                value={templateProperties.title}
                onChange={(e) => updateTemplateProperties({ title: e.target.value })}
                placeholder="عنوان القالب"
                className="mt-1 border-secondary-200 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="type" className="text-sm-medium text-secondary-700">النوع</Label>
              <Select
                value={templateProperties.type}
                onValueChange={(value) => updateTemplateProperties({ type: value })}
              >
                <SelectTrigger className="mt-1 border-secondary-200">
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent className="bg-white border-secondary-200">
                  <SelectItem value="Form">نموذج</SelectItem>
                  <SelectItem value="Document">مستند</SelectItem>
                  <SelectItem value="Report">تقرير</SelectItem>
                  <SelectItem value="Certificate">شهادة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="users" className="text-sm-medium text-secondary-700">المستخدمون</Label>
              <Input
                id="users"
                value={templateProperties.users}
                onChange={(e) => updateTemplateProperties({ users: e.target.value })}
                placeholder="المستخدمون المستهدفون"
                className="mt-1 border-secondary-200 focus:border-primary-500"
              />
            </div>
            
            <div>
              <Label htmlFor="pageSize" className="text-sm-medium text-secondary-700">حجم الصفحة</Label>
              <Select
                value={templateProperties.pageSize}
                onValueChange={(value) => updateTemplateProperties({ pageSize: value })}
              >
                <SelectTrigger className="mt-1 border-secondary-200">
                  <SelectValue placeholder="اختر حجم الصفحة" />
                </SelectTrigger>
                <SelectContent className="bg-white border-secondary-200">
                  <SelectItem value="A4">A4</SelectItem>
                  <SelectItem value="A3">A3</SelectItem>
                  <SelectItem value="Letter">Letter</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="advanced"
                checked={templateProperties.orientation === 'Landscape'}
                onCheckedChange={(checked) => 
                  updateTemplateProperties({ orientation: checked ? 'Landscape' : 'Portrait' })
                }
                className="border-secondary-300"
              />
              <Label htmlFor="advanced" className="text-sm-medium text-secondary-700">الاتجاه الأفقي</Label>
            </div>
            
            <div>
              <Label className="text-sm-medium text-secondary-700">رفع الخلفية</Label>
              <Button variant="outline" className="w-full mt-2 border-secondary-200 hover:bg-secondary-50">
                <Upload className="w-4 h-4 ml-2" />
                اختر ملف
              </Button>
            </div>
          </div>
        </div>

        {/* Selected Element Properties */}
        {selectedElement && (
          <div className="border-t border-secondary-200 pt-6">
            <h3 className="text-lg-semibold text-secondary-900 mb-4">خصائص العنصر</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="elementLabel" className="text-sm-medium text-secondary-700">التسمية</Label>
                <Input
                  id="elementLabel"
                  value={selectedElement.properties.label || ''}
                  onChange={(e) => updateElement(selectedElement.id, {
                    properties: { ...selectedElement.properties, label: e.target.value }
                  })}
                  placeholder="تسمية العنصر"
                  className="mt-1 border-secondary-200 focus:border-primary-500"
                />
              </div>
              
              <div>
                <Label htmlFor="elementPlaceholder" className="text-sm-medium text-secondary-700">النص التوضيحي</Label>
                <Input
                  id="elementPlaceholder"
                  value={selectedElement.properties.placeholder || ''}
                  onChange={(e) => updateElement(selectedElement.id, {
                    properties: { ...selectedElement.properties, placeholder: e.target.value }
                  })}
                  placeholder="النص التوضيحي"
                  className="mt-1 border-secondary-200 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="required"
                  checked={selectedElement.properties.required || false}
                  onCheckedChange={(checked) => updateElement(selectedElement.id, {
                    properties: { ...selectedElement.properties, required: !!checked }
                  })}
                  className="border-secondary-300"
                />
                <Label htmlFor="required" className="text-sm-medium text-secondary-700">حقل مطلوب</Label>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="width" className="text-sm-medium text-secondary-700">العرض</Label>
                  <Input
                    id="width"
                    type="number"
                    value={selectedElement.width}
                    onChange={(e) => updateElement(selectedElement.id, {
                      width: parseInt(e.target.value) || 0
                    })}
                    className="mt-1 border-secondary-200 focus:border-primary-500"
                  />
                </div>
                <div>
                  <Label htmlFor="height" className="text-sm-medium text-secondary-700">الارتفاع</Label>
                  <Input
                    id="height"
                    type="number"
                    value={selectedElement.height}
                    onChange={(e) => updateElement(selectedElement.id, {
                      height: parseInt(e.target.value) || 0
                    })}
                    className="mt-1 border-secondary-200 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateProperties;
