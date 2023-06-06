import styles from "./totalEarnings.module.scss";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import Image from "next/image";
import { useState } from "react";
// import {
// 	CartesianGrid,
// 	Label,
// 	Line,
// 	LineChart,
// 	ResponsiveContainer,
// 	Tooltip,
// 	XAxis,
// 	YAxis,
// } from "recharts";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const filter = {
	allTimeSales: "All time sales",
	last24Hours: "Last 24 hours",
	pastWeek: "Past week",
	pastMonth: "Past month",
	pastYear: "Past year",
};

// const data = [
// 	{ month: "january", count: 1, sales: 2 },
// 	{ month: "february", count: 2, sales: 10 },
// 	{ month: "march", count: 3, sales: 4 },
// 	{ month: "april", count: 4, sales: 5 },
// 	{ month: "may", count: 5, sales: 30 },
// 	{ month: "june", count: 6, sales: 1 },
// 	{ month: "july", count: 7, sales: 0 },
// 	{ month: "august", count: 8, sales: 2 },
// 	{ month: "september", count: 9, sales: 20 },
// 	{ month: "october", count: 10, sales: 5 },
// 	{ month: "november", count: 11, sales: 7 },
// 	{ month: "december", count: 12, sales: 2 },
// ];

export function TotalEarnings(props) {
	const [open, setOpen] = useState(false);
	const [filterValue, setFilterValue] = useState(filter.allTimeSales);

	const handleOpenFilter = () => {
		setOpen(!open);
	};

	const handleClickFilter = (e) => {
		setFilterValue(e.target.value);
		setOpen(false);
	};
	
	return (
		<Grid container direction="column" className={styles.container}>
			{/* Header */}
			<Stack className={styles.header} direction="row">
				<Typography variant="h3">Your sales</Typography>

				<Stack className={styles.filter_container}>
					{/* Filter */}
					<Box className={styles.filter_outer}>
						<Button
							className={styles.filter_inner}
							onClick={handleOpenFilter}
							endIcon={
								<Image
									width="16"
									height="16"
									src={
										!open
											? "/down_arrow_gradient.svg"
											: "/up_arrow_gradient.svg"
									}
									alt="arrow"
									className={styles.icon}
								/>
							}
						>
							<Typography>{filterValue}</Typography>
						</Button>
					</Box>

					{/* Filter dropdown */}
					{open ? (
						<ClickAwayListener onClickAway={() => setOpen(false)}>
							<Stack className={styles.dropdown}>
								<Box className={styles.filter}>
									<option
										value={filter.allTimeSales}
										onClick={handleClickFilter}
									>
										{filter.allTimeSales}
									</option>
								</Box>
								<Box className={styles.filter}>
									<option
										value={filter.last24Hours}
										onClick={handleClickFilter}
									>
										{filter.last24Hours}
									</option>
								</Box>
								<Box className={styles.filter}>
									<option value={filter.pastWeek} onClick={handleClickFilter}>
										{filter.pastWeek}
									</option>
								</Box>
								<Box className={styles.filter}>
									<option value={filter.pastMonth} onClick={handleClickFilter}>
										{filter.pastMonth}
									</option>
								</Box>
								<Box className={styles.filter}>
									<option value={filter.pastYear} onClick={handleClickFilter}>
										{filter.pastYear}
									</option>
								</Box>
							</Stack>
						</ClickAwayListener>
					) : null}
				</Stack>
			</Stack>

			<Stack>
				<LineChart />
			</Stack>
		</Grid>
	);
}


export const LineChart = () => {
	const labels = [
								'January', 'February', 'March',
								'April', 'May', "June", 'July',
								'August', 'September', 'October',
								'November', 'December'];
	
	const data = {
						labels: labels,
						datasets: [{
							label: "Total Earnings",
							data: [200, 300, 400, 200, 100, 300, 500, 600, 900, 800, 600, 400],
							fill: false,
							borderColor: 'fff',
							tension: 0.1,
							backgroundColor: 'black'
						}]
					}

	return (
		<div>
      <Line data={data} width={50} height={50} />
    </div>
	);
}

{/* <Respo;nsiveContainer width={"100%"} height={512}> */}
					{/* <LineChart data={data}>
						<CartesianGrid stroke="#b2b2b2" />
						<YAxis dataKey="sales">
							<Label
								value="Number of sales"
								position="left"
								angle={-90}
								style={{ textAnchor: "middle" }}
							/>
						</YAxis>

						<XAxis dataKey="count">
							<Label
								value="Month"
								position="bottom"
								style={{ textAnchor: "middle" }}
							/>
						</XAxis>

						<Line dataKey="sales" name="Sales" type="natural" />
						<Tooltip />
					</LineChart> */}
				{/* </ResponsiveContainer> */}


	