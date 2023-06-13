import styles from "./totalEarnings.module.scss";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { ClickAwayListener } from "@mui/base";
import Image from "next/image";
import { useState } from "react";
import Chart, { CategoryScale } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const filter = {
	allTimeSales: "All time sales",
	last24Hours: "Last 24 hours",
	pastWeek: "Past week",
	pastMonth: "Past month",
	pastYear: "Past year",
};

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

Chart.register(CategoryScale);

export function LineChart() {
	const labels = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Total Earnings",
				data: [200, 300, 400, 200, 400, 400, 500, 600, 900, 800, 600, 400],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				borderWidth: 2,
				tension: 0.5,
			},
		],
	};

	return (
		<div
			className={styles.earningsChart}
			style={{ maxHeight: "600px", maxWidth: "800px" }}
		>
			<Line data={data} width={50} height={30} />
		</div>
	);
}
