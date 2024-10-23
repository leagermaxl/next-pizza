import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className='mt-10'>
        <Title text='Все пиццы' size='lg' className='font-extrabold mt-7' />
      </Container>
      <TopBar />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          {/* Левая часть */}
          <div className='w-[250px]'>
            <Filters />
          </div>
          {/* Правая часть */}
          <div className='flex-1'></div>
        </div>
      </Container>
    </>
  );
}
