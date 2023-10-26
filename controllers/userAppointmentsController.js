const prisma = require('../prisma/db');

const userAppointmentsController = async (req, res) => {
        try {
        const appointments = await prisma.appointment.findMany({
            where: {
                warden: req.user,
            },
        });
        res.status(200).send({
            success: true,
            message: "Users Appointments Fetch SUccessfully",
            data: appointments,
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In User Appointments",
        });
        }
    };

module.exports = { userAppointmentsController };
