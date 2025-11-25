import React, {useEffect, useState} from "react";
import {Badge} from "react-bootstrap";

import "./TimeRemaining.css";
const TimeRemaining = ({ fechaCreacion, fechaEntrega }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const creationDate = new Date(fechaCreacion);
        const deliveryDate = new Date(fechaEntrega);
        const now = new Date();


        if (isNaN(creationDate) || isNaN(deliveryDate)) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                progress: 0,
                expired: true
            };
        }

        if (deliveryDate <= creationDate) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                progress: 100,
                expired: true
            };
        }

        const totalDuration = deliveryDate - creationDate;
        const elapsed = now - creationDate;
        const progress = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);

        const expired = now >= deliveryDate;

        if (!expired) {
            const total = deliveryDate - now;
            const days = Math.floor(total / (1000 * 60 * 60 * 24));
            const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));


            return {
                days,
                hours,
                minutes,
                progress,
                expired: false
            };
        }

        return {
            days: 0,
            hours: 0,
            minutes: 0,
            progress: 100,
            expired: true
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 60000);

        return () => clearInterval(timer);
    }, [fechaCreacion, fechaEntrega]);

    const getProgressBarClass = () => {
        if (timeLeft.expired) return 'progress-bar-expired';
        if (timeLeft.progress > 75) return 'progress-bar-danger';
        if (timeLeft.progress > 50) return 'progress-bar-warning';
        return 'progress-bar-success';
    };


    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Tiempo Restante para Entrega</h5>
                <div className="d-flex align-items-center">
                    <i className="bi bi-clock me-2"></i>
                    {timeLeft.expired ? (
                        <Badge bg="danger">Plazo Vencido</Badge>
                    ) : (
                        <Badge bg="primary">En Progreso</Badge>
                    )}
                </div>
            </div>

            <div className="progressContainer">
                <div
                    className={`progress-bar ${getProgressBarClass()}`}
                    style={{ width: `${timeLeft.progress}%`, transition: 'width 1s ease', height: '10px' }}
                    role="progressbar"
                    aria-valuenow={timeLeft.progress}
                    aria-valuemin="0"
                    aria-valuemax="100"

                />
            </div>

            {!timeLeft.expired ? (
                <div className="timeDisplay">
                    <div className="timeUnit">
                        <h4 className="mb-0">{timeLeft.days}</h4>
                        <small className="text-muted">días</small>
                    </div>
                    <div className="timeUnit">
                        <h4 className="mb-0">{timeLeft.hours}</h4>
                        <small className="text-muted">horas</small>
                    </div>
                    <div className="timeUnit">
                        <h4 className="mb-0">{timeLeft.minutes}</h4>
                        <small className="text-muted">minutos</small>
                    </div>
                </div>
            ) : (
                <div className="text-center mt-3">
                    <p className="text-danger mb-0">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        La fecha de entrega ha expirado
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimeRemaining;
