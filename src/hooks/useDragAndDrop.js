import { useState, useCallback, useRef } from 'react';

export function useDragAndDrop({ items = [], onReorder }) {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const _dragCounter = useRef(0);

  const isDragging = !!draggedItem;

  const handleDragStart = useCallback((e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', item.id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverItem(null);
  }, []);

  const handleDragOver = useCallback((e, item) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (item.id !== draggedItem?.id) {
      setDragOverItem(item);
    }
  }, [draggedItem]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    // Only clear if actually leaving the container
    if (e.currentTarget === e.target) {
      setDragOverItem(null);
    }
  }, []);

  const handleDrop = useCallback(async (e, targetItem) => {
    e.preventDefault();
    
    if (!draggedItem || !targetItem || draggedItem.id === targetItem.id) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = items.findIndex(i => i.id === draggedItem.id);
    const targetIndex = items.findIndex(i => i.id === targetItem.id);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    // Create new order
    const newItems = [...items];
    const [removed] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    // Call onReorder with new order
    if (onReorder) {
      await onReorder(newItems);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  }, [draggedItem, items, onReorder]);

  const dragProps = (itemId) => {
    const item = items.find(i => i.id === itemId);
    const isDragged = draggedItem?.id === itemId;
    const isOver = dragOverItem?.id === itemId;

    return {
      draggable: true,
      onDragStart: (e) => handleDragStart(e, item),
      onDragEnd: handleDragEnd,
      onDragOver: (e) => handleDragOver(e, item),
      onDragLeave: handleDragLeave,
      onDrop: (e) => handleDrop(e, item),
      style: {
        opacity: isDragged ? 0.4 : 1,
        backgroundColor: isOver && !isDragged ? 'var(--admin-surface-2)' : undefined,
        cursor: 'grab',
      },
    };
  };

  const dragOverProps = (itemId) => ({
    onDragOver: (e) => handleDragOver(e, items.find(i => i.id === itemId)),
    onDragLeave: handleDragLeave,
    onDrop: (e) => handleDrop(e, items.find(i => i.id === itemId)),
  });

  return {
    draggedItem,
    dragOverItem,
    isDragging,
    dragProps,
    dragOverProps,
  };
}