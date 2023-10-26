const prisma = require('../prisma/db');
const findAppointmentIdByUsernameAndWarden = async (username, warden) => {
    const appointment = await prisma.appointment.findFirst({
        where: {
            username: username, // Replace with the actual field name for the username
            warden: warden,     // Replace with the actual field name for the warden
        },
        select: {
            id: true, // Select only the id field
        },
    });

    if (appointment) {
        return appointment.id; // Returns the id of the appointment
    } else {
        return null; // No appointment found for the given username and warden
    }
};






const updateStatusController = async (req, res) => {
    try {
        const appointmentId = await findAppointmentIdByUsernameAndWarden(req.body.user, req.user);
        const appointments = await prisma.appointment.update({
            where: { id:appointmentId},
            data: { status: req.body.status },
        });
        res.status(200).send({
            success: true,
            message: "Appointment Status Updated",
        });
        } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error In Update Status",
        });
        }
};
module.exports = { updateStatusController };
