import React from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignupPage.css';

function SignupPage(props) {
	const initialFormState = {
		name: '',
		username: '',
		password: '',
	};

	const [formState, setFormState] = useState(initialFormState);

	function handleChange(event) {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log('you clicked me');
		console.log(formState);
		// setFormState(initialFormState);
	}

	return (
		<Container
			id='main-container'
			style={{ height: '6em', width: '30em', display: 'grid' }}>
			<Form
				onSubmit={handleSubmit}
				id='sign-in-form'
				className='text-center w-100'
				style={{
					padding: '1em 3em',
					boxShadow: '0 4px 15px 0',
					backgroundColor: 'rgb(250,250,255)',
				}}>
				<h1 className='mb-5 fs-3 fw-normal'>Please Sign up</h1>
				<Form.Group controlId='name'>
					<Form.Control
						type='text'
						size='lg'
						placeholder='Your Name'
						// autoComplete='username'
						className='position-relative mb-1'
						value={formState.name}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='username'>
					<Form.Control
						type='email'
						size='lg'
						placeholder='Email address'
						autoComplete='username'
						className='position-relative mb-1'
						value={formState.username}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group controlId='password'>
					<Form.Control
						type='password'
						size='lg'
						placeholder='Password'
						autoComplete='current-password'
						className='position-relative mb-4'
						value={formState.password}
						onChange={handleChange}
					/>
				</Form.Group>

				<div className='button-box'>
					<div className='d-grid mb-5 signup button '>
						<Button variant='secondary' type='button'>
							<p className='signup-text'>Already have an account?</p>
							<a href='' className='signup-text'>
								Log in!
							</a>
						</Button>
					</div>
					<div className='d-grid mb-5 signin button'>
						<Button variant='primary' type='submit'>
							Sign In
						</Button>
					</div>
				</div>

				{/* <p className='text-muted'>&copy; 2021-2022</p> */}
			</Form>
		</Container>
	);
}

export default SignupPage;