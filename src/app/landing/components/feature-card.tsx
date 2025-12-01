import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";


import React from "react";
import {LucideIcon} from "lucide-react";

interface FeaturedAttributes {
    icon: LucideIcon,
    title: String,
    desc: String
}

function FeatureCard({icon: Icon, title, desc}: FeaturedAttributes) {

    return (

        <Card
            className="group border-white/10 bg-white/5 backdrop-blur-lg hover:border-white/30 transition-all duration-300 text-gray-400">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="p-2">
                        <Icon className="h-10 w-10 text-cyan-400 " aria-hidden/>
                    </div>
                    <CardTitle className="text-base">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="text-sm text-white/70 leading-relaxed">{desc}</CardContent>
        </Card>
    );
}

export {FeatureCard};