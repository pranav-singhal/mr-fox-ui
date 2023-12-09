'use client'
import { Card, Divider, Avatar } from 'antd';
import Markdown from 'markdown-to-jsx'
import { ConnectKitButton } from 'connectkit';
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import {MessageType} from '../page';
import { signTypedData, sendTransaction, waitForTransaction } from '@wagmi/core'
import { Button } from '../../../node_modules/antd/es/index';


const ActionBody = (props: any) => {
    const { address, isConnected } = useAccount();
    const wakuInstance = props.wakuInstance;
    const actionObject = props?.actionObject;

    const handleAction = async () => {
        if(actionObject.name === 'get_user_address') {
            wakuInstance.sendActionResopnse({
                name: actionObject.response_event,
                output: address
            })
        }

        if (actionObject.name === 'get_swap_signature') {
            const signature = await signTypedData(actionObject?.args?.typedData)
            wakuInstance.sendActionResopnse({
                name: actionObject.response_event,
                output: {signature}
            })

        }

        if (actionObject.name === 'get_approval_for_token') {
            const { hash } = await sendTransaction(actionObject?.args?.calldata);
            const data = await waitForTransaction({ hash });
            wakuInstance.sendActionResopnse({
                name: actionObject.response_event,
                output: {success: true, message: "approval granted" }
            })
        }
    }

    if (!actionObject) {
        return null;
    }

    if (!isConnected) {
        return (
            <div>
                Before I can help you, you need to connect your wallet.
                <br />
                Rest assured! I will not ask you to sign anything dangerous
                <br />
                <ConnectKitButton />
            </div>
        )
    }

    switch (actionObject?.name) {
        case 'get_user_address':
            return (
                <div>     
                    Before I can proceed, I need your address. 
                    <br />
                    Since you have already connected your wallet,
                    all you need to do is click on the button below
                    <br />
                    <Button onClick={handleAction}>
                        Send wallet address
                    </Button>
                </div>
            );
        case 'get_swap_signature':
            return (
                <div>
                    In order to make this swap, I will need you to sign a transaction for me.
                    <br />
                    Click on the button below to open the transaction in your wallet.
                    <br />
                    <Button onClick={handleAction}>
                        Sign Transaction
                    </Button>
                </div>
            );

        case 'get_approval_for_token':
            return (
                <div>
                    In order to execute this swap, you will need to grant me approval.
                    <br />
                    Click on the button below to open the approval transaction in the wallet.
                    <br />
                    You can verify the swap in the wallet as well
                    <br />

                    <Button onClick={handleAction}>
                        Grant approval
                    </Button>
                </div>
            );
    
        default:
            return <div> This looks like a weird transaction. Let me check on this!</div>;
    }

}

const Message = (props: any) => {
    const message: MessageType = props.message;
    const action: string = message.action || '';
    const wakuInstance = props.wakuInstance;
    let actionObject: any= {name: '', args: {}, response_event: ''};

    if (action) {
        actionObject = JSON.parse(action);
    }

    return (
        <Card style={{boxShadow: 'none', borderRadius:'4px'}}    bordered={false}>
            <Card.Grid style={{width: '25%', border: 'none', boxShadow: 'none'}}>
                {
                    message.type === 'user' ? 
                    <Avatar shape="square" size={40} icon={<UserOutlined />} />:
                    <Avatar shape="square" size={40} icon={<RobotOutlined />} />
                }
            

            </Card.Grid>
            <Card.Grid style={{width: '75%', margin: 'auto',  border: 'none', boxShadow: 'none'}}>
                {
                    message.prompt && <Markdown>
                    {message.prompt}
                    </Markdown>
                }

                {
                    actionObject?.name && <ActionBody actionObject={actionObject} wakuInstance={wakuInstance} />
                }
    
            </Card.Grid>
            <Divider/>
            
        
        </Card>
    )
}

export default Message;