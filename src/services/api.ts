import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'https://app.xts.vn/dungbaby-service/hs/apps/execute/xts';

export interface LoginRequest {
  _type: string;
  _dbId: string;
  _msgId: string;
  deviceId: string;
  userToken: string;
  userName: string;
  password: string;
  telegramId: string;
  zaloId: string;
  phone: string;
  otp: string;
  deviceInfo: string;
  fullName: string;
}

export interface ReportRequest {
  _type: string;
  _dbId: string;
  _msgId: string;
  reportName: string;
  startDate: string;
  endDate: string;
  conditions: Array<{
    _type: string;
    property: string;
    value: {
      _type: string;
      id: string;
      dataType: string;
      presentation: string;
      navigationRef: null;
    };
    comparisonOperator: string;
  }>;
}

export interface ReportData {
  salesOrders: number;
  salesAmount: number;
  receiptCash: number;
  receiptBank: number;
  postPayment: number;
}

const headers = {
  'accept': '*/*',
  'accept-encoding': 'gzip, deflate, br, zstd',
  'accept-language': 'en-US,en;q=0.9,vi;q=0.8,vi-VN;q=0.7',
  'content-type': 'text/plain;charset=UTF-8',
  'origin': 'https://cool-clafoutis-0474e4.netlify.app',
  'referer': 'https://cool-clafoutis-0474e4.netlify.app/',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'cross-site',
  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
};

export const login = async (username: string, password: string) => {
  const loginData: LoginRequest = {
    _type: 'XTSSignInRequest',
    _dbId: '',
    _msgId: '',
    deviceId: uuidv4(),
    userToken: '',
    userName: username,
    password: password,
    telegramId: '',
    zaloId: '',
    phone: '',
    otp: '',
    deviceInfo: '',
    fullName: ''
  };

  try {
    const response = await axios.post(API_URL, loginData, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const getReportData = async (startDate: string, endDate: string) => {
  const reportData: ReportRequest = {
    _type: 'XTSGetReportDataRequest',
    _dbId: '',
    _msgId: '',
    reportName: 'Dashboard',
    startDate,
    endDate,
    conditions: [
      {
        _type: 'XTSCondition',
        property: 'company',
        value: {
          _type: 'XTSObjectId',
          id: 'a4e5cb74-5b27-11ef-a699-00155d058802',
          dataType: 'XTSCompany',
          presentation: 'Cửa hàng Dung-Baby',
          navigationRef: null
        },
        comparisonOperator: '='
      }
    ]
  };

  try {
    const response = await axios.post(API_URL, reportData, { headers });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch report data');
  }
};