import DataTable from "@components/dataTable";

const initialData = [
  {
    isDone: false,
    companyLogo: "https://via.placeholder.com/40",
    companyName: "Company A",
    timestamp: "2024-06-23T16:00:00Z",
    type: "complaint",
  },
  {
    isDone: true,
    companyLogo: "https://via.placeholder.com/40",
    companyName: "Company B",
    timestamp: "2024-06-20T12:00:00Z",
    type: "requirement",
  },
  {
    isDone: true,
    companyLogo: "https://via.placeholder.com/40",
    companyName: "Company B",
    timestamp: "2024-06-20T12:00:00Z",
    type: "requirement",
  }
  // Add more data as needed
];

function CommunityManagerDashboard() {
  return(
    <DataTable initialData={initialData}/>
  )
}

export default CommunityManagerDashboard;