import service from '@/service';
import './styles.scss';
import { cb } from '@/utils/utils';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const blockName = 'signup';
const bem = cb(blockName);

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const handleSubmit = async () => {
		try {
			if (username && password) {
				await service.signup({
					username,
					password
				});
			}
		} catch (e) {
			let errorMessage = 'Unable to register your account';
			if (e.response.data === 'ACCOUNT_ALREADY_EXISTS') {
				errorMessage = 'Account already exists'
			}
			toast.error(errorMessage);
		}
	};
	const passwordIcon = () => showPassword ? <i className="fa-regular fa-eye-slash"></i>: <i className="fa-regular fa-eye"></i>;

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};
	
	return (
		<div className={blockName}>
			<h1 className={bem('title')} >Register</h1>
			<div onKeyDown={handleKeyDown}>
				<div className={bem('input-group')}>
					<label className={bem('label')} htmlFor="username">Username</label>
					<input 
						className={bem('input')} 
						id="username" 
						name="username" 
						type="text" 
						autoComplete="username" 
						required 
						autoFocus
						value={username}
						onChange={(e) => setUsername(e.target.value?.trim())}
					/>
				</div>
				<div className={bem('input-group')}>
					<label className={bem('label')} htmlFor="current-password">Password</label>
					<input 
						className={bem('input')} 
						id="current-password" 
						name="password" 
						type={showPassword ? "text": "password"} 
						autoComplete="current-password" 
						required
						value={password}
						onChange={(e) => setPassword(e.target.value?.trim())}
					/>
					<button className={bem('password-icon-container')} onClick={() => setShowPassword(current => !current)}>
						{passwordIcon()}
					</button>
				</div>
				<button className={bem('submit-button')} onClick={handleSubmit}>Register</button>
			</div>
		</div>
	);

}

export default Login;
