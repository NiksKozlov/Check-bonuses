import React, {useEffect, useState} from 'react';
import s from './App.module.css'
import {Modal} from '../components/Modal/Modal';
import {ArrowRightIcon, BurnIcon, InformationIcon} from '../assets/img';
import {clientService} from '../services/client.service';
import {checkBonusesService} from '../services/checkBonuses.service';
import {AxiosError} from "axios";

type BonusesDataType = {
  typeBonusName: string,
  currentQuantity: number,
  forBurningQuantity: number,
  dateBurning: string
}

function App(): JSX.Element {
  const [active, setActive] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [bonusesData, setBonusesData] = useState<BonusesDataType>({} as BonusesDataType)

  const clientID = '2c44d8c2-c89a-472e-aab3-9a8a29142315'
  const deviceID = '7db72635-fd0a-46b9-813b-1627e3aa02ea'

  const onClickHandler = async () => {
    try {
      const result = await checkBonusesService.checkBonuses(accessToken)
      if (result.data.resultOperation.status === 0) {
        setBonusesData(result.data.data)
        setActive(true)
      } else {
        console.log('error: ', result.data.resultOperation.message)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('error:', error.message)
      }
    }
  }

  useEffect(() => {

      const fetchData = async () => {
        try {
          const result = await clientService.createAccessToken({idClient: clientID, paramValue: deviceID})
          if (result.data.result.status === 0) {
            setAccessToken(result.data.accessToken)
          } else {
            console.log('error: ', result.data.result.message)
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log('error:', error.message)
          }
        }
      }

      fetchData()

    }, []
  )

  const formatDate = (date: string) => {
    let yy = date.slice(0, 4)

    let mm = date.slice(5, 7)

    let dd = date.slice(8, 10)

    return dd + '.' + mm + '.' + yy
  }

  return (
    <div>
      <div className={s.first_block}>
        <div>ЛОГОТИП</div>
        <button className={s.button_info} onClick={onClickHandler}><InformationIcon/></button>
      </div>
      <div className={s.second_block}></div>
      {active && <Modal active={active} close={setActive} classNameModal={s.modal}>
          <div className={s.wrapper}>
              <div>
                  <div className={s.bonuses_quantity}>
                    {bonusesData.currentQuantity} бонусов
                  </div>
                  <div className={s.bonuses_to_burn}>
                    {formatDate(bonusesData.dateBurning)} сгорит <BurnIcon/> {bonusesData.forBurningQuantity} бонусов
                  </div>
              </div>
              <button className={s.cansel_button} onClick={() => setActive(false)}><ArrowRightIcon/></button>
          </div>
      </Modal>}
    </div>
  );
}

export default App;
