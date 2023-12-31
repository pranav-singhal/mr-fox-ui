import GetUserAddress from "./GetUserAddress";
import SwapToken from "./SwapToken";
import ApproveToken from "./ApproveToken";
import SendToken from "./SendToken";
import ShowPortfolioGraph from "./ShowPortfolioGraph";

export enum Actions {
  GetAddress = "get_user_address",
  SwapToken = 'sign_swap_transaction',
  GrantTokenApproval = 'get_approval_for_token',
  SendToken = 'send_token_transaction',
  ShowPortfolioGraph = 'get_chart_data'
};

const actions = {
  get_user_address: GetUserAddress,
  sign_swap_transaction: SwapToken,
  get_approval_for_token: ApproveToken,
  send_token_transaction: SendToken,
  get_chart_data: ShowPortfolioGraph
};

export default actions;
