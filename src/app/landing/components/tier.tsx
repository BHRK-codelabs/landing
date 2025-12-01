import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ArrowRight, Check, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button";
import React from "react";

interface TierProps {
    name: String,
    price: String,
    subtitle: String,
    features: any[],
    cta: String,
    highlighted: boolean
}


function Tier(tier: TierProps) {
    return (<Card
            className={`relative border-white/10 bg-white/5 backdrop-blur-md ${tier.highlighted ? "ring-2 ring-lime-400/60" : ""}`}>
            {tier.highlighted && (
                <Badge className="absolute -top-3 right-3 bg-lime-500 text-white">Recomendado</Badge>
            )}
            <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                    {tier.name} {tier.highlighted && <Sparkles className="h-4 w-4"/>}
                </CardTitle>
                <p className="text-white/70 text-sm">{tier.subtitle}</p>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-end gap-2">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span className="text-white/60">/ proyecto</span>
                </div>
                <ul className="space-y-2 text-sm">
                    {tier.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2">
                            <Check className="mt-0.5 h-4 w-4 text-lime-400"/>
                            <span className="text-white/80">{f}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button className="w-full group" variant={tier.highlighted ? "default" : "secondary"}>
                    {tier.cta}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                </Button>
            </CardFooter>
        </Card>
    );
}

export {Tier};