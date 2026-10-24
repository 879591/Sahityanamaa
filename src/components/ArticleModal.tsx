import React, { useState } from 'react';
import { ArticleItem } from '../types';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onShowToast: (msg: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
  onShowToast,
}) => {
  const [fontSize, setFontSize] = useState<number>(18);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    onShowToast('लिंक कॉपी किया गया!');
  };

  const handleSave = () => {
    onToggleSave(article.id);
    onShowToast(isSaved ? 'रचना संग्रह से हटाई गई' : 'रचना सहेज ली गई! ★');
  };

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
      aria-labelledby="modal-title"
    >
      <div className="modal-container">
        <div className="modal-header">
          <div>
            <span className="modal-badge">{article.category}</span>
            {article.subCategory && (
              <span
                style={{
                  marginLeft: '8px',
                  fontSize: '11px',
                  color: 'var(--muted)',
                }}
              >
                • {article.subCategory}
              </span>
            )}
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

        <div className="modal-body" style={{ fontSize: `${fontSize}px` }}>
          <h2 id="modal-title" className="modal-title">
            {article.title}
          </h2>

          <div className="modal-meta">
            {article.author && <span>लेखक: {article.author}</span>}
            {article.date && <span>• {article.date}</span>}
            {article.readTime && <span>• वाचन: {article.readTime}</span>}
          </div>

          <div className="modal-content">{article.content}</div>
        </div>

        <div className="modal-actions">
          <div className="modal-tools">
            <button
              type="button"
              className="tool-btn"
              onClick={() => setFontSize((s) => Math.max(14, s - 2))}
              title="अक्षर छोटे करें"
            >
              A-
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={() => setFontSize(18)}
              title="सामान्य आकार"
            >
              A
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={() => setFontSize((s) => Math.min(24, s + 2))}
              title="अक्षर बड़े करें"
            >
              A+
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={handleSave}
              style={{
                background: isSaved ? '#5e2b52' : 'white',
                color: isSaved ? 'white' : 'var(--ink)',
              }}
            >
              {isSaved ? '★ सहेजा हुआ' : '☆ सहेजें'}
            </button>
            <button
              type="button"
              className="tool-btn"
              onClick={handleCopyLink}
            >
              साझा करें ⎘
            </button>
          </div>

          <div>
            {article.originalUrl && (
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ padding: '8px 14px', fontSize: '11px' }}
              >
                मूल वेबसाइट पर देखें ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
