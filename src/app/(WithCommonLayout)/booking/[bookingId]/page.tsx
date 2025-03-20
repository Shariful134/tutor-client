import BookingsComponent from "@/components/modules/booking/BookingsComponent";
interface bookingPageProps {
  params: { bookingId: string };
}
const BookingPage = async ({ params }: bookingPageProps) => {
  const bookingId = await params?.bookingId;
  return (
    <div className="pt-20">
      <BookingsComponent tutorId={bookingId}></BookingsComponent>
    </div>
  );
};

export default BookingPage;
