import './styles.scss';
import { cb } from '@/utils/utils';
import React, { useState } from 'react';
import { login } from '@/redux/actions';
import { useDispatch } from 'react-redux';

const blockName = 'login';
const bem = cb(blockName);

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (username && password) {
			dispatch(
				login({
					username,
					password,
				})
			);
		}
	};

	const passwordIcon = () =>
		showPassword ? (
			<i className="fa-regular fa-eye-slash"></i>
		) : (
			<i className="fa-regular fa-eye"></i>
		);

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	return (
		<div className={blockName}>
			<h1 className={bem('title')}>Sign in</h1>
			<div onKeyDown={handleKeyDown}>
				<div className={bem('input-group')}>
					<label className={bem('label')} htmlFor="username">
						Username
					</label>
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
					<label className={bem('label')} htmlFor="current-password">
						Password
					</label>
					<input
						className={bem('input')}
						id="current-password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						autoComplete="current-password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value?.trim())}
					/>
					<button
						className={bem('password-icon-container')}
						onClick={() => setShowPassword((current) => !current)}
					>
						{passwordIcon()}
					</button>
				</div>
				<button className={bem('submit-button')} onClick={handleSubmit}>
					Sign in
				</button>
			</div>
		</div>
	);
};

export default Login;
