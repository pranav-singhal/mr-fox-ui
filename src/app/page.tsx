'use client'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { SearchOutlined } from '@ant-design/icons';

import { Button, Input, Divider, Space } from 'antd';
import styles from './page.module.css'
import { registerTopic } from './services/ApiService'
import WakuService, { MESSAGE_RECEIVED, waitForNodeInitialisation } from './services/WakuService'
import { Card, List } from '../../node_modules/antd/es/index';
import Message from './components/Message.tsx';
import ProviderTree from './components/ProviderTree.tsx'
let wakuService: WakuService;

export type MessageType = {
  id: number;
  type: string; // user | agent
  createdAt: number; // timestamp
  prompt?: string;

  // sample action: "{"name":"get_user_address","args":{},"response_event":"user_address_found"}"
  action?: any;
}

const prompts = ['who are you?', 'how much dai do I have?', 'swap WMATIC to USDT', 'What is my addresss'];
export default function Home() {

  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const refValue = useRef(messages);
  const [isInitialising, setIsInitialising] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const [isRespondingToPrompt, setIsRespondingToPrompt] = useState<boolean>(false);
  const [wakuInstance, setWakuInstance] = useState<WakuService>();
  

  const init = async () => {
    // initialise waku node
    await waitForNodeInitialisation();

    // register topic with ai bot
    const registerTopicResponse = await registerTopic('local-fox')

    // create waku-service instance
    wakuService = new WakuService('local-fox');
    await wakuService.startWatchingForNewMessages();

    setWakuInstance(wakuService);


    wakuService.on(MESSAGE_RECEIVED, (event) => {
      setIsRespondingToPrompt(false);
      console.log('message from server: ', event, messages);
      
      setMessages([...refValue.current, {type: 'system', id: Date.now(), createdAt: Date.now(), prompt: event?.prompt, action: event?.action}])
      refValue.current = [...refValue.current, {type: 'system', id: Date.now(), createdAt: Date.now(), prompt: event?.prompt, action: event?.action}];
      
    })
    setIsInitialising(false);
  }
  useEffect(() => {
    console.log('i was called')
    init()
  }, []);

  const handleClick = async () => {
      await handlePrompt(inputMessage);
  }

  const handlePrompt = async (prompt: string) => {
    // only call if no prompt is queued
    if (!isRespondingToPrompt) {
      setIsRespondingToPrompt(true);

      refValue.current = [...messages, {id: Date.now(), type: 'user', createdAt: Date.now(), prompt}];
      setMessages([...messages, {id: Date.now(), type: 'user', createdAt: Date.now(), prompt}])
      await wakuService.pushMessage(prompt);
    }
    
    
  }

  return (
    <ProviderTree>
      <main className={styles.main}>
      <div className={styles.chat}>
        <List bordered style={{height: '80vh', overflow: 'scroll', padding: '6px'}}>
        {
          messages.map((_message: MessageType) => {
            return  (<Message wakuInstance={wakuInstance} message={_message} key={_message.id} />)
          })
        }
        </List>
      </div>

      <footer style={{width: '80%', position: 'absolute', bottom: '20px'}}>
        <List
    grid={{
      gutter: 16,
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      xxl: 4,
    }}
    dataSource={prompts}
    renderItem={(prompt: string) => (
      <List.Item>
        <Card onClick={() => handlePrompt(prompt)} style={{cursor: 'pointer'}}>{prompt}</Card>
      </List.Item>
    )}
  />
      <Space.Compact style={{ width: '100%' }}>
      <Input defaultValue="Combine input and button" value={inputMessage} onChange={(e) => {
       setInputMessage(e?.target?.value);
     }} />
      <Button onClick={handleClick} disabled={inputMessage.length ===0 || isInitialising} type="primary">Submit</Button>
    </Space.Compact>
      </footer>
     
     
     

     
    </main>
    </ProviderTree>
  )
}
