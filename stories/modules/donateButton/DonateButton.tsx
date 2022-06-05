import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { userState, loadingState, paymentState } from "../../../store/states";
import { Input } from "../input/Input";
import { getPayment } from "../../../api/payment";

interface DonateButtonProps { }

/**
 * Primary UI component for user interaction
 */
export const DonateButton = ({ }: DonateButtonProps) => {
  const [userInfo, _setUserInfo] = useRecoilState(userState);
  const [_isLoading, setIsLoading] = useRecoilState(loadingState);
  const [showModal, setShowModal] = useState(false);
  const [formInfo, setFormInfo] = useRecoilState(paymentState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getDonateData = async (data: any) => {
    setIsLoading(true);
    const { Amt, Comment } = data;
    const params = {
      Amt: Number(Amt),
      Comment,
      user_id: "6281b760628bc7e95641fa81",
      Desc: 'Donate Test',
      login_user_id: userInfo._id,
    }
    await getPayment(params).then((res: any) => {
      if (res && res.data)
        setFormInfo({ ...res.data.data });
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (document && formInfo.MerchantID !== '') {
      (document?.getElementById('Spgateway') as HTMLFormElement).submit();
    }
  }, [formInfo, formInfo.MerchantID])

  useEffect(() => {
    setValue("Amt", 200);
    setValue("Comment", "");
  }, [setValue])

  return (
    <>
      <button
        type="button"
        className={`border-2 border-b-4 border-solid border-dark text-black font-bold rounded-lg py-1.5 px-2 mr-2`}
        onClick={() => setShowModal(true)}
      >贊助</button>
      {/* Modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        className={`${showModal ? "" : "hidden "}overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full justify-center items-center flex`}
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="relative p-6 w-full max-w-2xl h-full md:h-auto">
          <form
            className="relative bg-white rounded-lg shadow"
            method="post"
            onSubmit={handleSubmit(getDonateData)}
          >
            <div className="flex justify-between items-start p-4 rounded-t border-b border-gray-400">
              <h3 className="text-xl font-semibold text-gray-900">
                贊助內容
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-toggle="defaultModal"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </button>
            </div>
            <div className="p-6 space-y-6 w-full">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                    贊助金額
                  </label>
                </div>
                <div className="md:w-3/4">
                  <Input
                    placeholder="請輸入贊助金額"
                    className="bg-gray-200 appearance-none border-1 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="number"
                    register={register("Amt", {
                      required: true
                    })}
                    error={{
                      errors: errors.Amt,
                      requiredError: "請輸入贊助金額",
                    }}
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                  <label className="block text-gray-500 font-bold md:text-center mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                    備註
                  </label>
                </div>
                <div className="md:w-3/4">
                  <Input
                    placeholder="請輸入備註，如：匯款者姓名"
                    className="bg-gray-200 appearance-none border-1 border-gray-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    register={register("Comment")}
                  />
                </div>
              </div>

              <div className="text-red-500">
                <small className="block">信用卡測試卡號：4000 2211 1111 1111</small>
                <small className="block">有效日期：大於今天</small>
                <small className="block">三碼：任意三碼</small>
                <small className="block">信箱：預設抓登入的使用者，可以先改成自己的信箱看通知</small>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-400">
              <button
                data-modal-toggle="defaultModal"
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >贊助</button>
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={() => setShowModal(false)}
              >取消</button>
            </div>
          </form>
          {/* 發送給藍新的隱藏表單 */}
          <form
            className="hidden"
            id="Spgateway"
            name="Spgateway"
            method="post"
            action={formInfo.PayGateWay}
          >
            <input readOnly id="MerchantID" value={formInfo.MerchantID} name="MerchantID" />
            <input readOnly id="MerchantOrderNo" value={formInfo.MerchantOrderNo} name="MerchantOrderNo" />
            <input readOnly id="Version" value={formInfo.Version} name="Version" />
            <input readOnly id="TradeInfo" value={formInfo.TradeInfo} name="TradeInfo" />
            <input readOnly id="TradeSha" value={formInfo.TradeSha} name="TradeSha" />
          </form>
        </div>
      </div>
    </>
  )
}