import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './settingUser.css';

const SettingUser = ({ url }) => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    // ดึงข้อมูล users ทั้งหมด
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`);
            console.log('Users data:', response.data);
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                toast.error(response.data.message || "Error");
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
        }
    };

    // เพิ่ม user ใหม่
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/register`, newUser);
            if (response.data.success) {
                toast.success('เพิ่มผู้ใช้สำเร็จ');
                fetchUsers();
                setNewUser({ name: '', email: '', password: '', role: 'user' });
            } else {
                toast.error(response.data.message || 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มผู้ใช้');
        }
    };

    // ลบ user
    const handleDeleteUser = async (userId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
            try {
                const response = await axios.delete(`${url}/api/user/delete/${userId}`);
                if (response.data.success) {
                    toast.success('ลบผู้ใช้สำเร็จ');
                    fetchUsers();
                }
            } catch (error) {
                toast.error('เกิดข้อผิดพลาดในการลบผู้ใช้');
            }
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="setting-user">
            <h2>จัดการผู้ใช้งาน</h2>
            
            {/* ฟอร์มเพิ่มผู้ใช้ใหม่ */}
            <div className="add-user-form">
                <h3>เพิ่มผู้ใช้ใหม่</h3>
                <form onSubmit={handleAddUser}>
                    <input
                        type="text"
                        placeholder="ชื่อผู้ใช้"
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        required
                    />
                    <input
                        type="email"
                        placeholder="อีเมล"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="รหัสผ่าน"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        required
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">เพิ่มผู้ใช้</button>
                </form>
            </div>

            {/* แสดงรายการผู้ใช้ */}
            <div className="users-list">
                <h3>รายชื่อผู้ใช้ทั้งหมด</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ชื่อผู้ใช้</th>
                            <th>อีเมล</th>
                            <th>สถานะ</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role || 'user'}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="delete-btn"
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SettingUser;