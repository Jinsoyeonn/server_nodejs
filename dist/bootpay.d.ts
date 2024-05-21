import { BootpaySingleton } from "./lib/bootpay/singleton";
import { AxiosInstance } from "axios";
export interface BootpayCommonResponse<T = any> {
    status: Number;
    code: Number;
    message?: String;
    data?: T;
}
export interface BootpayCancelData {
    receiptId: string;
    price?: number;
    taxFree?: number;
    name?: string;
    reason?: string;
    refund?: BootpayRefundData;
}
export interface BootpayRefundData {
    account: string;
    accountholder: string;
    bankcode: string;
}
export interface BootpaySubscribeBillingData {
    orderId: string;
    pg: string;
    itemName: string;
    cardNo: string;
    cardPw: string;
    expireYear: string;
    expireMonth: string;
    identifyNumber: string;
    userInfo?: BootpayUserInfoData;
    extra?: BootpaySubscribeExtraData;
}
export interface BootpayRequestSubscribeBillingPaymentData {
    billingKey: string;
    itemName: string;
    price: number;
    taxFree?: number;
    orderId: string;
    quota?: number;
    interest?: number;
    userInfo?: BootpayUserInfoData;
    items?: Array<BootpayItemData>;
    feedbackUrl?: string;
    feedbackContentType?: string;
    extra?: BootpaySubscribeExtraData;
}
export interface BootpayReserveSubscribeBillingData {
    billingKey: string;
    itemName: string;
    price: number;
    taxFree: number;
    orderId: string;
    quota?: number;
    interest?: number;
    schedulerType: string;
    executeAt: number;
    userInfo?: BootpayUserInfoData;
    items?: Array<BootpayItemData>;
    feedbackUrl: string;
    feedbackContentType: string;
}
export interface BootpayRequestPaymentData {
    pg?: string;
    method?: string;
    methods?: Array<string>;
    orderId: string;
    price: number;
    taxFree: number;
    itemName: string;
    returnUrl?: string;
    params: any;
    userInfo?: BootpayUserInfoData;
    items?: Array<BootpayItemData>;
    extra?: any;
}
export interface BootpayRequestUserTokenData {
    userId: string;
    email?: string;
    name?: string;
    gender?: number;
    birth?: string;
    phone?: string;
}
export interface BootpayItemData {
    unique: string;
    qty: number;
    itemName: string;
    price: number;
    cat1?: string;
    cat2?: string;
    cat3?: string;
}
export interface BootpaySubscribeExtraData {
    subscribeTestPayment: number;
    rawData?: number;
}
export interface BootpayUserInfoData {
    id: string;
    username: string;
    email: string;
    phone: string;
    gender: number;
    area: string;
}
declare class BootpayRestClient extends BootpaySingleton {
    $http: AxiosInstance;
    $token?: string;
    applicationId?: string;
    privateKey?: string;
    mode: string;
    constructor();
    /**
     * rest api configure
     * Comment by rumi
     * @date: 2020-10-27
     * @param (applicationId, privateKey, mode)
     * @returns void
     */
    setConfig(applicationId: string, privateKey: string, mode?: string): void;
    /**
     * getting access token
     * Comment by rumi
     * @date: 2020-10-27
     * @param void
     * @returns Promise<BootpayCommonResponse>
     */
    getAccessToken(): Promise<BootpayCommonResponse>;
    /**
     * receipt verify
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    verify(receiptId: string): Promise<BootpayCommonResponse>;
    /**
     * Server Submit method
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId
     * @returns Promise<BootpayCommonResponse>
     */
    submit(receiptId: string): Promise<BootpayCommonResponse>;
    /**
     * Payment Cancel
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayCancelData
     * @returns Promise<BootpayCommonResponse>
     */
    cancel(data: BootpayCancelData): Promise<BootpayCommonResponse<any>>;
    /**
     * Request Subscribe Card Billing Key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpaySubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    requestSubscribeBillingKey(data: BootpaySubscribeBillingData): Promise<BootpayCommonResponse<any>>;
    /**
     * destroy billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param billingKey: string
     * @returns Promise<BootpayCommonResponse>
     */
    destroySubscribeBillingKey(billingKey: string): Promise<BootpayCommonResponse<any>>;
    /**
     * subscribe payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestSubscribeBillingPaymentData
     * @returns Promise<BootpayCommonResponse>
     */
    requestSubscribeBillingPayment(data: BootpayRequestSubscribeBillingPaymentData): Promise<BootpayCommonResponse<any>>;
    /**
     * reserve payment by billing key
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayReserveSubscribeBillingData
     * @returns Promise<BootpayCommonResponse>
     */
    reserveSubscribeBilling(data: BootpayReserveSubscribeBillingData): Promise<BootpayCommonResponse<any>>;
    /**
     * Cancel Reserve Subscribe Billing
     * Comment by rumi
     * @date: 2020-10-27
     * @param reserveId: string
     * @returns Promise<BootpayCommonResponse>
     */
    destroyReserveSubscribeBilling(reserveId: string): Promise<BootpayCommonResponse<any>>;
    /**
     * Certificate Data
     * Comment by rumi
     * @date: 2020-10-27
     * @param receiptId: string
     * @returns Promise<BootpayCommonResponse>
     */
    certificate(receiptId: string): Promise<BootpayCommonResponse<any>>;
    /**
     * REST API로 결제 요청을 합니다
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: any
     * @returns Promise<BootpayCommonResponse>
     */
    requestPayment(data: BootpayRequestPaymentData): Promise<BootpayCommonResponse<any>>;
    /**
     * get user token
     * Comment by rumi
     * @date: 2020-10-27
     * @param data: BootpayRequestUserTokenData
     * @returns Promise<BootpayCommonResponse>
     */
    requestUserToken(data: BootpayRequestUserTokenData): Promise<BootpayCommonResponse<any>>;
    private getApiUrl;
}
export declare const RestClient: BootpayRestClient;
export {};
