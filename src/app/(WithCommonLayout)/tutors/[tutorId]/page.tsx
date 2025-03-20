import TutorDetailsComponent from "@/components/modules/tutor/TutorDetailsComponent";
interface TutorDetailsProps {
  params: { tutorId: string };
}
const TutorDetails = async ({ params }: TutorDetailsProps) => {
  const { tutorId } = params;

  return (
    <div>
      <TutorDetailsComponent id={tutorId}></TutorDetailsComponent>
    </div>
  );
};

export default TutorDetails;
