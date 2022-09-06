
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "../../style/loading.css"
const FloorAndBedLoading = () => {
    return Array(6).fill({}).map(() => {
        return (
            <div className='col-4 text-center'>
                <div className='floor'>
                    <Skeleton className='mb-4' width={120} height={35} />
                    <div className="row">
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>
                        <div className="col-4">
                            <Skeleton className='mb-2' height={82} width={82} />
                        </div>

                    </div>
                </div>
            </div>
        )
    });
}

export default FloorAndBedLoading;