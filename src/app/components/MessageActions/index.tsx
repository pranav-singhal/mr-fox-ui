import GetUserAddress from "./GetUserAddress";
import SwapToken from "./SwapToken";
import ApproveToken from "./ApproveToken";
import SendToken from "./SendToken";

export enum Actions {
  GetAddress = "get_user_address",
  SwapToken = 'sign_swap_transaction',
  GrantTokenApproval = 'get_approval_for_token',
  SendToken = 'send_token_transaction'
};

const actions = {
  get_user_address: GetUserAddress,
  sign_swap_transaction: SwapToken,
  get_approval_for_token: ApproveToken,
  send_token_transaction: SendToken,
};

export default actions;
