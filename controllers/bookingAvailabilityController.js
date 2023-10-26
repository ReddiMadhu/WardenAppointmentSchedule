const prisma = require('../prisma/db');

const moment = require("moment");

const bookingAvailabilityController = async (req, res) => {
        try {
            const currentDate = moment();
            const twoMonthsLater = moment(currentDate).add(2, "months");
            const availableDays = [];
            let currentDateCopy = moment(currentDate);
            const warden = req.body.warden;
            
            while (currentDateCopy.isBefore(twoMonthsLater)) {
                if (currentDateCopy.day() === 4 || currentDateCopy.day() === 5) {
                    availableDays.push(currentDateCopy.format("YYYY-MM-DD"));
                }
                currentDateCopy.add(1, "day");
            }
            
                // Query the database to retrieve scheduled appointments
            const scheduledAppointments = await prisma.appointment.findMany({
                where: {
                    warden:warden,
                },
            });
            // console.log(scheduledAppointments);
                // Remove days with appointments
            const daysWithNoAppointments = availableDays.filter((day) => {
            const isDayScheduled = scheduledAppointments.some((appointment) => {
                const date = moment(appointment.date).format("YYYY-MM-DD");
                console.log(date);
                console.log(day);
                return date === day;
            });
            if(isDayScheduled===true)console.log(day);
            return !isDayScheduled;
            });
            
        // const date = moment.utc(req.body.date, "DD-MM-YY").toISOString();
        // const fromTime = moment.utc(req.body.time, "HH:mm").subtract(1, "hours").toISOString();

        // const toTime = moment.utc(req.body.time, "HH:mm").add(1, "hours").toISOString();
        // console.log(fromTime);
        // console.log(toTime);
        // console.log(warden)
        // const appointments = await prisma.appointment.findMany({
        //     where: {
        //         warden: warden,
        //         time: {
        //             gt: fromTime,
        //             lt:toTime,
        //         },
        //     },
        // });
        // console.log(appointments);
        if (daysWithNoAppointments.length > 0) {
            return res.status(200).send({
            message: "Appointments available",
            success: true,
            data:daysWithNoAppointments,
            });
        } else {
            return res.status(200).send({
            success: true,
            message: "Appointments not Availibale at this time",
            });
        }
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Booking",
        });
        }
};
module.exports = { bookingAvailabilityController };
