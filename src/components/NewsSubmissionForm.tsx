import React, { useState } from 'react';
import type { NewsItem } from '../App';
import toast from 'react-hot-toast';
import axios from 'axios';

type Props = {
  onSubmit: (news: Omit<NewsItem, 'id' | 'timestamp'>) => void;
};

const NewsSubmissionForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 토큰 가져오기 (로컬 스토리지에서 가져오는 예시)
      const token = localStorage.getItem('token');
      
      // 쿼리 파라미터로 데이터 전송 (title과 content만)
      const response = await axios.post(
        `http://54.180.20.253:8080/post?title=${encodeURIComponent(formData.title)}&content=${encodeURIComponent(formData.content)}`,
        '', // 빈 body
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': '*/*'
          }
        }
      );
      
      if (response.status === 201 || response.status === 200) {
        onSubmit(formData);
        setFormData({
          title: '',
          content: ''
        });
        toast.success('소식이 등록되었습니다.');
      }
    } catch (error) {
      console.error('Error details:', error);
      toast.error('소식 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-emerald-800 mb-6">소식 작성하기</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition"
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </form>
    </div>
  );
};

export default NewsSubmissionForm;