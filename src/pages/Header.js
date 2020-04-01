import React, { useState } from "react";
import { Link } from "react-router-dom";
// burger for menu
import burger from "../assets/menu.png";

import { Modal } from "react-bulma-components";

import "./pages.scss";

/*
menubar COMPONENT 
Styling is in pages.scss 
	unable to see body content 
	for menubar hover 
		.menubar position and top to get menubar to hover 
		
Needed inline styling for Modal 
*/

const aTags = { color: "white" };

export default function Header() {
	const [show, setShow] = useState(false);
	console.log("show", show);
	return (
		<div className="menubar">
			<div className="tittle">
				<h1>COVID19 US Vaccine</h1>
			</div>

			<div className="mobile" onClick={() => setShow(true)}>
				<Modal show={show} onClose={() => setShow(false)}>
					<Modal.Content>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								textAlign: "center",
								fontSize: "1.5rem",
							}}
						>
							<Link to="/about" style={aTags}>
								About
							</Link>
							<a
								href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
								alt="cdc-website"
								style={aTags}
							>
								CDC Resources
							</a>
							<a
								href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
								alt="world-health-organization"
								style={aTags}
							>
								WHO Resources
							</a>
						</div>
					</Modal.Content>
				</Modal>
				<img src={burger} alt="menu-trigger" />
			</div>
			<div className="menubar-links">
				<Link to="/about">About</Link>
				<a
					href="https://www.cdc.gov/coronavirus/2019-ncov/index.html"
					alt="cdc-website"
				>
					CDC Resources
				</a>
				<a
					href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
					alt="world-health-organization"
				>
					WHO Resources
				</a>
			</div>
		</div>
	);
}