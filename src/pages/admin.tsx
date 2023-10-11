import axios from "axios";

const Admin = () => {
  return (
    <div className="flex gap-10">
      <button
        onClick={async () =>
          await axios.get("/api/admin/gen-dummy-data?type=themes")
        }
      >
        Generate Theme
      </button>
      <button
        onClick={async () =>
          await axios.get("/api/admin/gen-dummy-data?type=connect-tags")
        }
      >
        connect tags
      </button>
    </div>
  );
};

export default Admin;
