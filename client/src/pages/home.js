import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
// import { visible } from 'ansi-colors';

import { TemplateContext } from '../App';

export default function Home(props) {
	const [ smsLeft, setSmsLeft ] = useState(0);
	const [shopName, setShopName] = useState("Loading");
	const { temp, setTemp } = useContext(TemplateContext);

	// console.log(temp);

	const checkHandler = (e) => {
		console.log(e.target.checked);
		console.log(e.target.name);
	};

	const topicHandler = (e) => {
		// e.preventDefault();
		console.log(e.target.name);
		setTemp({ ...temp, topic: e.target.name });
	};

	const validate = (e) => {
		// e.preventDefault();
		let text = document.getElementById('admin-phone').value;

		let regx = /^[6-9][0-9]{9}$/;
		if (regx.test(text)) {
			document.getElementById('lbltext').innerHTML = 'all okay';
			document.getElementById('lbltext').style.display = 'block';
			document.getElementById('lbltext').style.color = 'green';
			return <Link to="/thanks" />;
		} else {
			document.getElementById('lbltext').innerHTML = 'Mobile no. is invalid Valid';
			document.getElementById('lbltext').style.display = 'block';
			document.getElementById('lbltext').style.color = 'red';
		}
	};

	const smsCount = () => {
		axios.get('/api/smsCount/').then((res) => {
			setSmsLeft(res.data);
		});
	};
	const getName = () => {
    axios.get("/api/name/").then(res => {
      setShopName(res.data);
    });
  };

	useEffect(() => {
		smsCount();
		getName();
	}, []);

	return (
		<Fragment>
			<div className="container-fluid">
				<section id="sms">
					<div className="row">
	<div className="col-md-4 sms centerr">SMS LEFT {smsLeft} @ {shopName}</div>
						{/* <Link> */}
						<div className="col-md-4 buy centerr">
							<Link to="/recharge" style={{ color: 'white' }}>
								Buy more sms
							</Link>
						</div>
						{/* </Link> */}
						<div className="col-md-4 country centerr">
							<Link to="/history" style={{ color: 'white' }}>
								SMS History
							</Link>
						</div>
					</div>
				</section>
				<section id="admin">
					<form
						action="https://immense-bastion-25565.herokuapp.com/myaction"
						// action="http://localhost:4000/myaction"
						method="post"
					>
						<div className="row">
							<div className="col-md-4 admin">
								<p>
									<b>Admin Phone No.</b> <br />
									<br />
									Admin will be notify on this no. by selecting Notify Admin.
								</p>
							</div>
							<div className="col-md-4 admin2 gray">
								<label htmlFor="input">Admin Phone No:</label> <br />
								<input type="number" size="10" id="admin-phone" name="admin no" placeholder="Type Number" />
								<p id="lbltext" style={{ color: 'red', display: 'none' }}>
									Invalid
								</p>
							</div>
							<div className="col-md-3 licence ml-5  px-2 gray">
								<br />
								<p>Licence Key: a43b4c25f400f37988ef7b5b6727b00f</p>
								<br />
							</div>
						</div>

						<hr />
						<section id="notification">
							<div className="row">
								<div className="col-md-4 notification">
									<br />
									<br />
									<b>Notification Preference</b> <br /> <br />
									<p>Select when to send SMS</p>
								</div>
								<div className="col-md-7 gray ">
									<table>
										<tbody>
											<tr>
												<th>Orders</th>
											</tr>
											<tr>
												<td>Create: </td>
												<td>
													<input type="checkbox" name="orders/create customer" /> Notify Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="orders/create admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="orders/create" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
											<tr>
												<td>Cancelled: </td>
												<td>
													<input type="checkbox" name="orders/cancelled customer" /> Notify Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="orders/cancelled admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="orders/cancelled" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
											<tr>
												<td>Fulfilled: </td>
												<td>
													<input type="checkbox" name="orders/fulfilled customer" /> Notify Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="orders/fulfilled admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="orders/fulfilled" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
											<tr>
												<td>Partially Fulfilled: </td>
												<td>
													<input type="checkbox" name="orders/partially_fulfilled customer" /> Notify
													Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="orders/partially_fulfilled admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="orders/partially_fulfilled" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
											<tr>
												<th>Customers Account</th>
											</tr>
											<tr>
												<td>Create: </td>
												<td>
													<input type="checkbox" name="customers/create customer" /> Notify Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="customers/create admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="customers/create" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
											<tr>
												<th>Refunds</th>
											</tr>
											<tr>
												<td>Create: </td>
												<td>
													<input type="checkbox" name="refunds/create customer" /> Notify Customer&nbsp;&nbsp;
												</td>
												<td>
													&nbsp;&nbsp;
													<input type="checkbox" name="refunds/create admin" /> Notify Admin&nbsp;&nbsp;
												</td>
												<td>
													<Link onClick={topicHandler} name="refunds/create" to="/templete">
														&nbsp;&nbsp; Edit template&nbsp;&nbsp;
													</Link>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</section>
						<hr />
						<section id="sender">
							<div className="row">
								<div className="col-md-4 admin">
									<p>
										<br />
										<br />
										<b>Sender Id</b> <br /> <br />
										Customise sender id according to your needs.
									</p>
								</div>
								<div className="col-md-7 admin2 mr-2 gray">
									<label htmlFor="input">Sender ID:</label>
									<input className="mx-5" autoCapitalize="true" type="text" name="sender id" maxLength={6} />
									<br />
									<br />
									<p>
										<b>What is Sender ID?</b> <br />
									</p>
									<ul>
										<li>
											Sender ID is the alpha-character name or number which appears on the mobile phone as the sender of
											a SMS (It is used to identify who’s sending the message to the recipient). Sender ID can be a
											alphacharacter name such as the name of your company.
										</li>
										<li>
											You can enter sender id for approval, once approved all your sms notifications will be sent with
											approved sender id for you.
										</li>
										<li>Sender ID will be maximum of 6 Characters.</li>
									</ul>
									<p />
									<button type="submit" onClick={validate} className>
										Save
									</button>
								</div>
							</div>
						</section>
					</form>
				</section>
			</div>
		</Fragment>
	);
}
