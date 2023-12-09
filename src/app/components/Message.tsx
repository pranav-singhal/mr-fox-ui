'use client'
import { Card, Divider, Avatar } from 'antd';
import Markdown from 'markdown-to-jsx'

import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import {MessageType} from '../page';
import { signTypedData, sendTransaction } from '@wagmi/core'

const Message = (props: any) => {
    const message: MessageType = props.message;
    const action: string = message.action || '';
    const wakuInstance = props.wakuInstance;
    let actionObject: any= {name: '', args: {}, response_event: ''};

    if (action) {
        actionObject  =JSON.parse(action);
    }

    const handleAction = async () => {
        if(actionObject.name === 'get_user_address') {
            wakuInstance.sendActionResopnse({
                name: actionObject.response_event,
                output: '0x122A832758d0F72BE72025b6694A11643052bE34'
            })
        }

        if (actionObject.name === 'get_swap_signature') {
            const signature = await signTypedData(actionObject?.args?.typedData)
            wakuInstance.sendActionResopnse({
                name: actionObject.response_event,
                output: {signature}
            })

        }
    }

    console.log(message)
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
                    actionObject?.name && <button onClick={handleAction}>
                            handle action
                    </button>
                }


                
                    
            </Card.Grid>
            <Divider/>
            
        
        </Card>
    )
}

export default Message;