import { Skeleton } from '@mui/material';

const SkeletonLoading = () => {
  return (
    <div className="card product-box shadow p-3">
      {/* Skeleton cho hình ảnh */}
      <Skeleton
        variant="rectangular"
        width="100%"
        height={200}
        style={{ borderRadius: '8px' }}
      />
      <div className="card-body mt-2 p-0">
        {/* Skeleton cho tiêu đề */}
        <Skeleton
          variant="text"
          width="60%"
          height={24}
          style={{ margin: '0 auto' }}
        />
        {/* Skeleton cho giá */}
        <Skeleton
          variant="text"
          width="40%"
          height={20}
          style={{ margin: '8px auto' }}
        />
        {/* Skeleton cho nút */}
        <Skeleton
          variant="rectangular"
          width="50%"
          height={36}
          style={{ margin: '8px auto', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default SkeletonLoading;
