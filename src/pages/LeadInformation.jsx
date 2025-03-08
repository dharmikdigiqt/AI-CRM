/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import LabelWithValue from "../components/common/LableWithValue";
import { Card } from "../components/common/Card";
import { CardTitle } from "../components/common/CardTitle";

const leadDetails = [
  {
    lead_id: "67c631a3a1c96400019d0765",
    organization_name: "insurnest",
    organization_designation: "Founder",
    email: "akshay@digiqt.com",
  },
  {
    lead_id: "67c631a3a1c96400019d0766",
    organization_name: "Digiqt Technolabs",
    organization_designation: "Chief Executive Officer",
    email: "darshit@digiqt.com",
  },
  {
    lead_id: "67c631a3a1c96400019d0767",
    organization_name: "iMoney Group",
    organization_designation: "Chief System Architect",
    email: "rutvik@digiqt.com",
  },
  {
    lead_id: "67c631a3a1c96400019d0768",
    organization_name: "Coverfox Insurance",
    organization_designation: "Sr. Tech Architect",
    email: "dhruvi@digiqt.com",
  },
  {
    lead_id: "67c631a3a1c96400019d0769",
    organization_name: "Fynd (Shopsense Retail Technologies Pvt. Ltd.)",
    organization_designation: "Sr. Platform Software Engineer",
    email: "dharmik@digiqt.com",
  },
  {
    lead_id: "67c631a3a1c96400019d076a",
    organization_name: "Azoi Inc",
    organization_designation: "Software Engineer",
    email: "vaibhav.chavda@digiqt.com",
  },
];

const LeadInformation = () => {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const getLeadData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users-data/`);
      console.log("res:::::", res);

      setLeadData(res?.lead_details);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getLeadData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "organization_name",
        header: "Organization Name",
      },
      {
        accessorKey: "organization_designation",
        header: "Designation",
      },
      {
        accessorKey: "email",
        header: "Email  ",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <button
            onClick={() => navigate(`/lead/${row.original.email}`)}
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
          >
            <IconEye size={20} />
          </button>
        ),
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: leadDetails,
  });

  return (
    <>
      <MantineReactTable table={table} />;
      <Card className="border-none p-4 space-y-2">
        <CardTitle>Personal details</CardTitle>
        <div className="grid grid-cols-4 gap-4">
          <LabelWithValue
            classNames={{ value: "font-normal text-base" }}
            label="name"
            value="darshit"
          />
          <LabelWithValue
            label="Mobile no."
            classNames={{ value: "font-normal text-base" }}
            // value={}
          />
          <LabelWithValue
            label="Email"
            classNames={{ value: "font-normal text-base" }}
            value="darshit@digiqt.com"
          />
          <LabelWithValue
            classNames={{ value: "font-normal text-base" }}
            label="Residential city"
            value="ahemdabad"
          />
          <LabelWithValue
            classNames={{ value: "font-normal text-base" }}
            label="Passport have or not?"
            value={"yes"}
          />
          <LabelWithValue
            label="Name in passport"
            classNames={{ value: "font-normal text-base" }}
            value="29299393939"
          />
          <LabelWithValue
            classNames={{ value: "font-normal text-base" }}
            label="No of application"
            value="105"
          />
        </div>
      </Card>
    </>
  );
};

export default LeadInformation;
