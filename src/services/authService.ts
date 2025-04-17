import axios from 'axios';

// API 기본 URL 설정
const API_URL = 'http://54.180.20.253:8080'; // 실제 API URL로 변경해주세요

// 로컬 스토리지에서 토큰 관리를 위한 키 정의
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// 토큰 저장 함수
export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// 토큰 가져오기 함수
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

// 토큰 삭제 함수 (로그아웃 시 사용)
export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

// 회원가입 요청
export const signUp = async (email: string, name: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/sign-up`, {
    email,
    name,
    password,
    school: 'DGSW' // API 문서에 따르면 회원가입시 DGSW로 고정
  });
  return response.data;
};

// 로그인 요청
export const signIn = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/sign-in`, {
    email,
    password
  });
  
  // 토큰 저장
  if (response.data.data) {
    const { accessToken, refreshToken } = response.data.data;
    saveTokens(accessToken, refreshToken);
  }
  
  return response.data;
};

// 리프레시 토큰으로 액세스 토큰 갱신
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  try {
    const response = await axios.post(`${API_URL}/refresh`, {
      refreshToken
    });
    
    // 새로운 액세스 토큰 저장
    if (response.data.data && response.data.data.accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.data.accessToken);
    }
    
    return response.data;
  } catch (error) {
    // 토큰 갱신 실패 시 로그아웃
    removeTokens();
    throw error;
  }
};

// axios 인터셉터 설정 - 401 에러 시 토큰 갱신 시도
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // 401 에러이고, 재시도하지 않은 요청일 경우에만 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        await refreshAccessToken();
        // 새 토큰으로 원래 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${getAccessToken()}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트 등의 처리...
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// 요청 시 기본적으로 Authorization 헤더 추가
axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
