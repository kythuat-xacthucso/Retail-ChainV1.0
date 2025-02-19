import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'vi' | 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    'overview.title': 'Báo Cáo Tổng Quan',
    'overview.startDate': 'Từ Ngày',
    'overview.endDate': 'Đến Ngày',
    'overview.confirm': 'Xác Nhận',
    'overview.revenue': 'Doanh Thu',
    'overview.orderQuantity': 'Số Lượng Đơn Hàng',
    'overview.cashCollection': 'Thu Tiền Mặt',
    'overview.transfer': 'Chuyển Khoản',
    'overview.debt': 'Công Nợ',
    'login.title': 'Chào Mừng Trở Lại',
    'login.subtitle': 'Vui lòng đăng nhập để tiếp tục',
    'login.username': 'Nhập tên đăng nhập . . .',
    'login.password': 'Nhập mật khẩu . . .',
    'login.button': 'Đăng Nhập',
    'login.signing': 'Đang đăng nhập...',
  },
  en: {
    'overview.title': 'Overview Report',
    'overview.startDate': 'Start Date',
    'overview.endDate': 'End Date',
    'overview.confirm': 'Confirm',
    'overview.revenue': 'Revenue',
    'overview.orderQuantity': 'Order Quantity',
    'overview.cashCollection': 'Cash Collection',
    'overview.transfer': 'Transfer',
    'overview.debt': 'Debt',
    'login.title': 'Welcome Back',
    'login.subtitle': 'Please sign in to continue',
    'login.username': 'Enter username . . .',
    'login.password': 'Enter password . . .',
    'login.button': 'Login',
    'login.signing': 'Signing in...',
  },
  zh: {
    'overview.title': '概览报告',
    'overview.startDate': '开始日期',
    'overview.endDate': '结束日期',
    'overview.confirm': '确认',
    'overview.revenue': '收入',
    'overview.orderQuantity': '订单数量',
    'overview.cashCollection': '现金收款',
    'overview.transfer': '转账',
    'overview.debt': '债务',
    'login.title': '欢迎回来',
    'login.subtitle': '请登录以继续',
    'login.username': '输入用户名 . . .',
    'login.password': '输入密码 . . .',
    'login.button': '登录',
    'login.signing': '正在登录...',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['vi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}