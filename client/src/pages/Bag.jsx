import { useEffect } from 'react'

const Bag = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(1);
    });
    
    return (
        <>
            <header className="container p-3">
                <h1 className="text-light text-center">Current Wears</h1>
            </header>
            <main>
                <section>
                    
                </section>
                <section className="card container p-3 fixed-bottom skip-menu-padding-bottom">
                    <h4 className="text-gray mb-3 text-center">Other Wears</h4>
                    <div className="row nft-items-grid card-window-scroller">
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/e65f60618446f5d9897f2d5a97c30e76.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/1986a8a71a31ce0221a96c2b9aef87bb.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/84cdc84313024124e63e677b017f3a34.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/5de47d7599197e428d9425087a2027f0.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gae/eDlHWnyukmwhxHwtsTS2LYQhW1acN6Y_d4rGWiG6_TIYaPGnWroRJrZ3eH60gvu8ai_djia5dx03Ea9wWOJOZgV-mOS_ffv7PVSwtw?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-4">
                            <img src="https://i.seadn.io/gcs/files/dd971e5613e0cc206c9d24d12db86443.png?auto=format&dpr=1&w=750" className="img-fluid rounded-start" alt="..." />
                        </div>
                    </div>
                    <div className="d-none flex-column justify-content-center align-items-center text-gray">
                        <span className="material-icons text-gray">expand_less</span>
                        點擊查看其他可用裝備
                    </div>
                </section>
            </main>
        </>
    );
}

export default Bag;
