import './styles.scss';
import { cb } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { fetchActiveUser, updateActiveUser } from '@/redux/actions';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import useSelectOrFetch from '@/hooks/useSelectOrFetch';
import { getActiveUser } from '@/redux/selectors';

const blockName = 'account-settings';
const bem = cb(blockName);

const AccountSettings = () => {
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');

	const {content: user} = useSelectOrFetch(getActiveUser, fetchActiveUser);

	useEffect(() => {
		setUsername(user.username);
	}, [user, setUsername]);

	const handleSubmit = () => {
			if (password && password !== confirmedPassword) {
				toast.error('Passwords must match');
				return;
			}
			if (username || password) {
				dispatch(
					updateActiveUser({
						...username && {username},
						...password && {password}
					})
				);
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
			<h1 className={bem('title')}>Edit Account</h1>
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
				<div className={bem('input-group')}>
					<label className={bem('label')} htmlFor="current-password">Confirm Password</label>
					<input 
						className={bem('input')} 
						id="current-password" 
						name="password" 
						type={showPassword ? "text": "password"} 
						autoComplete="current-password" 
						required
						value={confirmedPassword}
						onChange={(e) => setConfirmedPassword(e.target.value?.trim())}
					/>
					<button className={bem('password-icon-container')} onClick={() => setShowPassword(current => !current)}>
						{passwordIcon()}
					</button>
				</div>
				<button className={bem('submit-button')} onClick={handleSubmit}>Save</button>
			</div>
		</div>
	);
}

export default AccountSettings;
