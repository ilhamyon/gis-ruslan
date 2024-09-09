import { Button, Input, message } from "antd"
import RandomBG from "../components/RandomBG"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity/getClient";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { v4 as uuidv4 } from "uuid";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already signed in
    const token = localStorage.getItem("relawanRuslan_token");
    if (token) {
      // If signed in, redirect to "/home"
      navigate("/home");
    }
  }, [navigate]);

  const [serverData, setServerData] = useState({
    data: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    async function fetchSanityData() {
      try {
        const sanityData = await sanityClient.fetch(`*[_type == 'user-relawan-ruslan']{
          _id,
          name,
          email,
          type,
          password,
        }`);

        setServerData({
          data: sanityData,
          error: null,
          loading: false,
        });
      } catch (error) {
        setServerData({
          data: [],
          error: 'Error getting data. Please try again later.',
          loading: false,
        });
      }
    }

    fetchSanityData();
  }, []);
  console.log('cek data user: ', serverData)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    // Cek apakah ada data yang cocok dengan hasil input login
    const user = serverData.data.find(
      (relawanRuslan_userData) => relawanRuslan_userData.email === username && relawanRuslan_userData.password === password
    );

    if (user) {
      const filteredData = serverData?.data.filter(item => item._id === user._id);
      // Login berhasil
      console.log("Login berhasil:", user.name);
      message.success('Login Berhasil');
      navigate("/home");
      // setError("");

      // Generate token
      const token = uuidv4(); // Generate token using uuid library

      // Simpan token ke dalam local storage
      localStorage.setItem("relawanRuslan_token", token);
      localStorage.setItem("relawanRuslan_user", user.name);
      localStorage.setItem("relawanRuslan_id", user._id);
      localStorage.setItem('relawanRuslan_userData', JSON.stringify(filteredData));

      // Tambahkan logika redirect atau set state untuk login di sini
    } else {
      // Tampilkan pesan error
      // setError("Username atau password salah");
      message.error("Username atau password salah");
    }
  };

  return (
    <>
      <section>
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <RandomBG />
          </div>
          <div className="lg:w-1/2 lg:py-0 py-10 flex items-center">
            <form className="w-full lg:px-28 px-4 items-center" onSubmit={handleLogin}>
              <h2 className="font-bold text-[18px] lg:text-4xl mb-10 text-gray-900 uppercase">Login</h2>
              <Input
                type="text"
                placeholder="Email"
                size="large"
                className="mb-4 border"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input.Password
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                size="large"
                className="mb-8 border"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                required
              />
              {/* {error && <p className="text-red-500">{error}</p>} */}
              <Button
                className="text-white bg-rose-700 w-full"
                htmlType="submit"
                size="large"
              >
                Login
              </Button>
              <p className="flex justify-center text-sm font-light mt-8 text-gray-500">
                <Link to="/register" className="text-rose-700"> or&nbsp;Register</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login