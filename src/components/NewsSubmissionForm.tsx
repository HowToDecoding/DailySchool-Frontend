import React, { useState } from 'react';
import type { NewsItem } from '../App';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {
  onSubmit: (news: Omit<NewsItem, 'id' | 'timestamp'>) => void;
};

const NewsSubmissionForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '공지사항' as NewsItem['category'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // API 호출 예시
      // const response = await axios.post('/api/news', formData);
      // if (response.data.success) {
      onSubmit(formData);
      setFormData({
        title: '',
        content: '',
        category: '공지사항',
      });
      toast.success('소식이 등록되었습니다.');
      // }
    } catch (error) {
      toast.error('소식 등록에 실패했습니다. 다시 시도해주세요.');
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
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as NewsItem['category'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="공지사항">공지사항</option>
            <option value="행사">행사</option>
            <option value="급식메뉴">급식메뉴</option>
            <option value="일정변경">일정변경</option>
          </select>
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
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default NewsSubmissionForm;