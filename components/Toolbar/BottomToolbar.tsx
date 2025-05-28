
import React from 'react';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/store/editorStore';
import { Undo, Redo, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const BottomToolbar: React.FC = () => {
  const { undo, redo, reset, history, historyIndex, elements } = useEditorStore();
  
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleSave = () => {
    toast.success('تم حفظ القالب بنجاح!');
    console.log('Saving template with elements:', elements);
  };

  const handleReset = () => {
    if (elements.length > 0) {
      const confirmed = window.confirm('هل أنت متأكد من الرغبة في إعادة التعيين؟ سيؤدي هذا إلى حذف جميع العناصر.');
      if (confirmed) {
        reset();
        toast.info('تم إعادة تعيين القالب');
      }
    }
  };

  return (
    <div className="h-16 bg-white border-t border-secondary-200 flex items-center justify-center gap-4 px-6 font-arabic">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          className="flex items-center gap-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50"
        >
          <Undo className="w-4 h-4" />
          تراجع
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          className="flex items-center gap-2 border-secondary-200 text-secondary-700 hover:bg-secondary-50"
        >
          <Redo className="w-4 h-4" />
          إعادة
        </Button>
        
        <div className="w-px h-6 bg-secondary-300 mx-2" />
        
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white"
        >
          <Save className="w-4 h-4" />
          حفظ القالب
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex items-center gap-2 text-danger-600 hover:text-danger-700 border-danger-200 hover:bg-danger-50"
        >
          <RotateCcw className="w-4 h-4" />
          إعادة تعيين
        </Button>
      </div>
      
      <div className="text-xs-medium text-secondary-500">
        العناصر: {elements.length} | السجل: {historyIndex + 1}/{history.length}
      </div>
    </div>
  );
};

export default BottomToolbar;
