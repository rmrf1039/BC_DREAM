import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sportNameTranslation, thingsTranslation } from './translation'
import axios from 'axios';

import { wearImgs } from '../components/WearIconCollect';
import { Text, Modal, Header, Spacer, ModalContent, List, IconButton, PixelIcon, Heading, Container, Br } from "nes-ui-react";

const ViwLogModal = ({ open, onClose, date }) => {
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (date) {
      axios.get(`/api/history/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`)
      .then((res) => {
        setContent(res.data);
      });
    }
  }, [date]);

  return (
    <Modal className="top-50 start-50 translate-middle" open={open} onClose={onClose}>
      <Header>
        <Heading dense size="large">當天紀錄</Heading>
        <Spacer />
        <IconButton color="error" onClick={onClose}>
          <PixelIcon name="pixelicon-close" size='small' color='white' />
        </IconButton>
      </Header>
      <ModalContent>
        <Text>
          您於{date && `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}`}日做了以下{content.exercise?.length}次運動：
        </Text>
        {
          (content.exercise || []).map((item, idx) => (
            item.count > 0 &&
            <>
              <Container title={`第${idx + 1}次`} className="inventory m-0 ps-2 pe-2 pb-0 mb-3">
                <Text className='mb-2'>使用之 NFT</Text>
                <Link to={`/gear?tokenId=${item.gear?.token_id}`}>
                  <div className="boxes1 w-25 m-auto d-block">
                    <div className="box p-1">
                      <img src={wearImgs[item.gear?.type]} alt="nft" className="w-100" />
                    </div>
                  </div>
                </Link>
                <Br/>
                <List>
                  <li>運動項目：{sportNameTranslation(item.type)}</li>
                  <li>正確率：：{item.valid_count/item.count * 100}％ ({item.valid_count}/{item.count})</li>
                  <li>使用補品：{thingsTranslation(item.thing)}</li>
                </List>
              </Container>
            </>
          ))
        }
        <Text>
          共獲得{content.total_daily_exp}EXP。</Text>     
      </ModalContent>
    </Modal>
  )
}

export default ViwLogModal;