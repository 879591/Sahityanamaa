import React from 'react';
import { ArticleItem } from '../types';

interface SavedModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: ArticleItem[];
  onOpenArticle: (id: string) => void;
  onRemoveSave: (id: string) => void;
}

export const SavedModal: React.FC<SavedModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onOpenArticle,
  onRemoveSave,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-container" style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div>
            <span className="modal-badge">आपका संग्रह</span>
            <span
              style={{
                marginLeft: '8px',
                fontSize: '12px',
                color: 'var(--muted)',
              }}
            >
              ({savedArticles.length} रचनाएँ)
            </span>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="बंद करें"
          >
            ×
          </button>
        </div>

        <div className="modal-body" style={{ padding: '20px' }}>
          {savedArticles.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '30px 0' }}>
              अभी कोई रचना सहेजी नहीं गई है। किसी रचना को पढ़ते समय 'सहेजें' बटन दबाएँ।
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {savedArticles.map((art) => (
                <div
                  key={art.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 14px',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    background: '#fff',
                  }}
                >
                  <div
                    style={{ cursor: 'pointer', flex: 1 }}
                    onClick={() => {
                      onOpenArticle(art.id);
                      onClose();
                    }}
                  >
                    <small style={{ color: 'var(--plum)', fontSize: '10px' }}>
                      {art.category}
                    </small>
                    <h4 style={{ margin: '4px 0', fontSize: '15px' }}>
                      {art.title}
                    </h4>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      className="tool-btn"
                      onClick={() => {
                        onOpenArticle(art.id);
                        onClose();
                      }}
                    >
                      पढ़ें ↗
                    </button>
                    <button
                      type="button"
                      className="tool-btn"
                      onClick={() => onRemoveSave(art.id)}
                      style={{ color: '#a44' }}
                    >
                      हटाएँ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
