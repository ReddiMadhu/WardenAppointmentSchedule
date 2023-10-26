// import { PrismaClient } from "@prisma/client";
const prisma = require('../prisma/db');

// const prisma = new PrismaClient();
const moment = require("moment-timezone");

const bookAppointmentController = async (req, res) => {
        try {
        const date = moment.utc(req.body.date, "DD-MM-YYYY").toISOString();
        
        const time = moment.utc(req.body.time, "HH:mm").toISOString();

        // Create a new appointment using Prisma
        const newAppointment = await prisma.appointment.create({
            data: {
                username: req.user,
                warden: req.body.warden,
                date: date,
                status: "pending",
                time: time,
            },
        });

        res.status(200).send({
            success: true,
            message: "Appointment Book succesfully",
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error While Booking Appointment",
        });
        }
    };
    module.exports = { bookAppointmentController };
