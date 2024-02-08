import { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import { useAxios } from '../providers/AxiosProvider';

import WeeklyTaskModal from '../components/WeeklyTaskModal';

import { Container, Progress, Text, Hr, List, Button } from 'nes-ui-react';
import { wearImgs } from '../components/WearIconCollect';

const ExerciseResult = ({ layout = null }) => {
    useEffect(() => {
        layout?.({
            type: 'init',
            data: {
                title: '運動結果'
            }
        });
    }, [layout]);

    const { state: rawState } = useLocation();
    const { profile } = useAxios();

    const [state, setState] = useState({});
    const [isWeeklyTaskModalOpen, setIsWeeklyTaskModalOpen] = useState(false)

    useEffect(() => {
        if (rawState) {
            setState(rawState);
        }

        /* setState({
            result: {
                accuracy: 0.8,
                total_count: 15,
                type: 'bicep_curl',
                "exp": 20.96,
                "gear_exp": 95.94,
                "valid_count": 12,
                "daily_valid_count": 20,
                "daily_max_flag": false,
                "gear_max_flag": false,
                "task": {
                    "status": "DAILY_COMPLETE",
                    "count": 3,
                    "thing": {
                        "message": "You got a new thing x 1",
                        "type": "protein_powder",
                        "amount": 1
                    }
                },
                "thing": {
                    "type": "dumbbell",
                    "amount": 2,
                    "bonus": 5.98
                }
            }
        }); */
    }, [rawState]);

    useEffect(() => {
        if (state?.result?.task?.status) {
            setIsWeeklyTaskModalOpen(true);
        }
    }, [state]);

    return (
        <>
            <div className="d-flex flex-column justify-content-between align-items-center">
                <Container roundedCorners className="m-3 mt-0 inventory">
                    {
                        state?.result?.status === 'WORKMIN_FAILED'
                        ?
                            <Text>最低合格次數未達到<>{state.result?.workmin}</>下</Text>
                        :
                        <>
                            <div className="boxes1 mb-5">
                                <div className="box p-3">
                                    <img src={wearImgs[profile.target.type]} alt="nft" className="w-100" />
                                </div>
                            </div>

                            <Text size="large" className="mb-3 align-items-center d-flex"><span className="material-symbols-sharp me-2">bolt</span> {state?.result?.exp}經驗值增加</Text>
                            <Progress value={0.5} max="1" color="success" />
                            <Hr />
                            <List styleType='circle'>
                                <li>
                                    <Text size="medium" className="mb-1">總次數：{state?.result?.total_count}下</Text>
                                </li>
                                <li>
                                <Text size="medium" className="mb-1">總正確次數：{state?.result?.valid_count}下</Text>
                                </li>
                            </List>
                        </>
                    }
                    
                </Container>
                <WeeklyTaskModal
                    open={isWeeklyTaskModalOpen}
                    data={state?.result?.task}
                    onClose={() => setIsWeeklyTaskModalOpen(false)}
                />

                <div className='ps-3 pe-3 w-100'>
                    <Link to={`/`}>
                        <Button color="error" size="medium" className="w-100">回到主頁</Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ExerciseResult;
