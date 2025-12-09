import ServiceCard from '@/components/Card/ServiceCard';
import Container from '@/components/Container';
import CreateNewInput from '@/components/Input/CreateNewInput';
import SearchInput from '@/components/Input/SearchInput';
import { serviceData } from '@/constants/service';

export default function Service() {
  return (
    <Container className='flex flex-col gap-6'>
      <div className='flex flex-row justify-between items-center'>
        <SearchInput placeholder='Tên dịch vụ...' />
        <CreateNewInput label='Thêm dịch vụ mới:' buttonName='Tạo dịch vụ' />
      </div>
      <div className='grid grid-cols-5 gap-5'>
        {serviceData.map((item, key) => (
          <ServiceCard key={key} data={item} />
        ))}
      </div>
    </Container>
  );
}
